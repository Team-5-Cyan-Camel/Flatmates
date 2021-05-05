var express = require("express");
var Room = require("../mongo/Room");
var User = require("../mongo/User");
var router = express.Router();

/* POST a room to be created */
router.post("/", async function (req, res, next) {
  const user = await getUserOfCookie(req, res);

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

  // TODO: add user to room in socket.io
});

/* POST a request to join a room */
router.post("/join", async function (req, res, next) {
  const user = await getUserOfCookie(req, res);
  console.log("AHHHHHH");
  console.log(req.body);
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
      { $push: { 
        Users: user._id,
       "rosters.$[].assignedUsers": user._id
      } }
    );
    user.roomCode = req.body.roomCode;
    await user.save();
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  // TODO: send notification on socket.io and add user to socket.io room
});

/* PATCH room details and remove the user from the room, if they are not host */
router.patch("/leave", async function (req, res, next) {
  const user = await getUserOfCookie(req, res);
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
  try {
    await Room.updateOne(
      { _id: user.roomCode },
      { $pull: { Users: user._id } }
    );
    user.roomCode = null;
    await user.save();
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  // TODO: remove user from socket.io room, notify other users
});

/* GET all information for a room */
router.get("/", async function (req, res, next) {
  const user = await getUserOfCookie(req, res);
  if (!user.roomCode) {
    return res
      .status(403)
      .json({ message: "User is not currently a member of any room" });
  }
  let room;
  try {
    room = await Room.findOne({ _id: user.roomCode })
      .populate("users", "_id username name")
      .populate("rosters.assignedUsers", "_id username name");
    return res.status(200).json(room);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/* DELETE a room, only the host may do this */
router.delete("/", async function (req, res, next) {
  const user = await getUserOfCookie(req, res);
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
router.patch("/kick", async function (req, res, next) {
  const user = await getUserOfCookie(req, res);
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

  let room;
  try {
    userToKick = await User.findOne({ username: req.body.username });

    await Room.updateOne(
      { _id: userToKick.roomCode },
      { $pull: { Users: userToKick._id } }
    );
    userToKick.roomCode = null;
    await userToKick.save();
    return res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  // TODO: remove user from socket.io room, notify other users
});

async function getUserOfCookie(req, res) {
  return new Promise(async (resolve) => {
    // Obtain user based on session cookie

    if (req.cookies.sessionID === undefined) {
      return res.status(401).json({ message: "Not logged in" });
    }
    let user;
    try {
      user = await User.findOne({
        sessionID: req.cookies.sessionID,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    // If user does not exist, session cookie is expired or invalid
    if (user === null) {
      return res.status(401).json({ message: "Invalid Session" });
    }
    resolve(user);
  });
}

module.exports = router;
