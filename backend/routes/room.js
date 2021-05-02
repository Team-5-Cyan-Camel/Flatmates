var express = require("express");
var Room = require("../mongo/Room");
var router = express.Router();

/* POST a room to be created */
router.post("/", async function (req, res, next) {
  const user = getUserOfCookie(req, res);

  if (user.roomCode != null) {
    // TODO: should this ever happen, frontend can prevent this??
    return res
      .status(403)
      .json({ message: "Must leave current room before creating another" });
  }

  // create a new room
  const newRoom = new Room({
    host: user,
    rosters: {},
    reminders: {},
    expenses: {},
    users: { user },
  });

  let room;
  try {
    room = await newRoom.save();
    user.roomCode = room._id;
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
  const user = getUserOfCookie(req, res);
  if (user.roomCode != null) {
    // TODO: should this ever happen, frontend can prevent this??
    return res
      .status(403)
      .json({ message: "Must leave current room before joining another" });
  }
  let room;
  try {
    await Room.updateOne(
      { _id: req.body.roomCode },
      { $push: { Users: user } }
    );
    return res.status(200);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  // CHANGE USER ROOM CODE
  // TODO: send notification on socket.io and add user to socket.io room
});

/* PACH room details and remove the user from the room */
router.patch("/leave", async function (req, res, next) {
  const user = getUserOfCookie(req, res);
  if (user.roomCode == null) {
    // TODO: should this ever happen, frontend can prevent this??
    // TODO: is this 403, since user leaving room when not in one, vs forbidden to join one
    return res
      .status(403)
      .json({ message: "User is not currently a member of any room" });
  }
  let room;
  try {
    await Room.updateOne(
      { _id: req.body.roomCode },
      { $pull: { Users: user } }
    );
    return res.status(200);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  // TODO RESET ROOM CODE OF USER TO NULL
  // TODO: remove user from socket.io room, notify other users
});

/* GET all information for a room */
router.get("/", async function (req, res, next) {
  const user = getUserOfCookie(req, res);
  if (user.roomCode == null) {
    // TODO: should this ever happen, frontend can prevent this??
    // TODO: is this 403, since user leaving room when not in one, vs forbidden to join one
    return res
      .status(403)
      .json({ message: "User is not currently a member of any room" });
  }
  let room;
  try {
    room = await Room.findOne({
      _id: user.roomCode,
    });
    return res.status(200).json(room);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/* DELETE a room */
router.delete("/", async function (req, res, next) {
  const user = getUserOfCookie(req, res);
  if (user.roomCode == null) {
    // TODO: should this ever happen, frontend can prevent this??
    // TODO: is this 403, since user leaving room when not in one, vs forbidden to join one
    return res
      .status(403)
      .json({ message: "User is not currently a member of any room" });
  }
  let room;
  try {
    room = await Room.findOne({
      _id: user.roomCode,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  if (room.host != user) {
    return res
      .status(403)
      .json({ message: "User is not the owner of the room they belong to" });
  }

  try {
    room = await Room.deleteOne({
      _id: user.roomCode,
    });
    return res.status(200);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

async function getUserOfCookie(req, res) {
  return new Promise(async (resolve) => {
    // Obtain user based on session cookie
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
    resolve();
  });
}

module.exports = router;
