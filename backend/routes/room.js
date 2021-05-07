var express = require("express");
var Room = require("../mongo/Room");
var User = require("../mongo/User");
var router = express.Router();
var getUserOfCookie = require("./utils/getUserFromCookie");

/* POST a room to be created */
router.post("/", getUserOfCookie, async function (req, res, next) {
  const user = req.user;

  if (user.roomCode) {
    return res
      .status(403)
      .json({ message: "Must leave current room before creating another" });
  }

  // create a new room
  const newRoom = new Room({
    host: user._id,
    rosters: [],
    reminders: [],
    expenses: [],
    users: [user._id],
  });

  let room;
  try {
    room = await newRoom.save();
    user.roomCode = room._id;
    user.isHost = true;
    await user.save();
    return res.status(201).json({
      roomCode: room._id,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/* POST a request to join a room */
router.post("/join", getUserOfCookie, async function (req, res, next) {
  const user = req.user;
  if (!req.body.roomCode) {
    return res
      .status(400)
      .json({ message: "bad request, missing room code to join" });
  }
  if (user.roomCode) {
    return res
      .status(403)
      .json({ message: "Must leave current room before joining another" });
  }
  let room;
  try {
    await Room.updateOne(
      { _id: req.body.roomCode },
      {
        $push: {
          users: user._id,
          "rosters.$[].assignedUsers": user._id,
        },
      }
    );
    user.roomCode = req.body.roomCode;
    await user.save();
    await socketRoomUpdate(user.roomCode);
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/* PATCH room details and remove the user from the room, if they are not host */
router.patch("/leave", getUserOfCookie, async function (req, res, next) {
  const user = req.user;
  if (!user.roomCode) {
    return res
      .status(403)
      .json({ message: "User is not currently a member of any room" });
  }
  if (user.isHost) {
    return res.status(403).json({
      message: "User is room host so cannot leave. Delete the room instead",
    });
  }
  let room;
  updateTaskUserIndex(user);
  try {
    await Room.updateOne(
      { _id: user.roomCode },
      {
        $pull: {
          users: user._id,
          "rosters.$[].assignedUsers": user._id,
        },
      }
    );
    let roomCode = user.roomCode;
    user.roomCode = null;
    await user.save();
    await socketRoomUpdate(roomCode);
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/* GET all information for a room */
router.get("/", getUserOfCookie, async function (req, res, next) {
  const user = req.user;
  if (!user.roomCode) {
    return res
      .status(403)
      .json({ message: "User is not currently a member of any room" });
  }
  let room;
  try {
    room = await Room.findOne({ _id: user.roomCode })
      .populate("users", "_id username name email phoneNumber")
      .populate("rosters.assignedUsers", "_id username name");
    return res.status(200).json(room);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/* DELETE a room, only the host may do this */
router.delete("/", getUserOfCookie, async function (req, res, next) {
  const user = req.user;
  if (!user.roomCode) {
    return res
      .status(403)
      .json({ message: "User is not currently a member of any room" });
  }
  if (user.isHost === false) {
    return res.status(403).json({
      message: "User is not the room host so cannot delete it",
    });
  }
  let room;
  try {
    room = await Room.findOne({
      _id: user.roomCode,
    });
    // remove all users codes
    for (i = 0; i < room.users.length; i++) {
      roomUser = await User.findOne({
        _id: room.users[i],
      });
      if (user._id != roomUser._id) {
        roomUser.roomCode = null;
        await roomUser.save();
      }
    }
    room = await Room.deleteOne({
      _id: user.roomCode,
    });

    user.roomCode = null;
    user.isHost = false;
    await user.save();
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/* PACTH room details and remove the user from the room, if they are not host */
router.patch("/kick", getUserOfCookie, async function (req, res, next) {
  const user = req.user;
  if (!user.roomCode) {
    return res
      .status(403)
      .json({ message: "User is not currently a member of any room" });
  }
  if (!user.isHost) {
    return res.status(403).json({
      message: "User is not room host so cannot kick",
    });
  }
  if (user.username == req.body.username) {
    return res.status(403).json({
      message: "Dont kick yourself",
    });
  }

  let room;
  updateTaskUserIndex(user);
  try {
    userToKick = await User.findOne({ username: req.body.username });

    await Room.updateOne(
      { _id: userToKick.roomCode },
      {
        $pull: {
          users: userToKick._id,
          "rosters.$[].assignedUsers": userToKick._id,
        },
      }
    );
    userToKick.roomCode = null;
    await userToKick.save();
    await socketRoomUpdate(user.roomCode);
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

async function socketRoomUpdate(roomCode) {
  return new Promise(async (resolve) => {
    if (global.io) {
      let room = await Room.findOne({ _id: roomCode })
        .populate("users", "_id username name email phoneNumber")
        .populate("rosters.assignedUsers", "_id username name");

      roomCode = JSON.stringify(room._id).replace(/(^")|("$)/g, "");
      global.io.in(roomCode).emit("room_update", room);
    }
    resolve();
  });
}

async function updateTaskUserIndex(user) {
  return new Promise(async (resolve) => {
    // Obtain room based on user
    let room = await Room.findOne({ _id: user.roomCode });
    for (let i = 0; i < room.rosters.length; i++) {
      let userIndex = room.rosters[i].assignedUsers.indexOf(user._id);
      for (let j = 0; j < room.rosters[i].tasks.length; j++) {
        if (room.rosters[i].tasks[j].userIndex == userIndex) {
          room.rosters[i].tasks[j].userIndex = -1;
        } else if (room.rosters[i].tasks[j].userIndex > userIndex) {
          room.rosters[i].tasks[j].userIndex--;
        }
      }
    }
    await room.save();
    resolve();
  });
}

module.exports = router;
