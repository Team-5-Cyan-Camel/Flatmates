var express = require("express");
var router = express.Router();
var User = require('../mongo/User');
var Room = require('../mongo/Room');
var Roster = require('../mongo/Roster');


/* POST new roster. */
router.post("/", getUser, getRoom, async function (req, res, next) {
  const newRoster = new Roster({
    title: req.body.title,
    tasks: [],
    assignedUsers: req.room.users,
  });

  let room;
  try {
    req.room.rosters.push(newRoster);
    room = await req.room.save();
    return res.status(200).json(room);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/* DELETE specified roster. */
router.delete("/", getUser, getRoom, getRoster, async function (req, res, next) {
  try {
    req.room.rosters.pull({ _id: req.body.rosterID });
    await req.room.save();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  return res.status(200).json({ message: "Successfully deleted" });

});

/* PATCH rotate a specified roster. */
router.patch("/rotate", function (req, res, next) {
  res.status(200).send("roster successfully rotated");
});

/* POST add a new task to a roster. */
router.delete("/task", function (req, res, next) {
  res.status(201).json({ taskID: "asdh" });
});

/* DELETE remove task from roster. */
router.delete("/task", function (req, res, next) {
  res.status(200).send("task successfully deleted");
});

async function getUser(req, res, next) {
  req.user = await User.findOne({ sessionID: req.cookies.sessionID });
  if (!req.user) {
    return res.status(401).json({ message: "Invalid cookies" })
  } else {
    next();
  }
}

async function getRoom(req, res, next) {
  if (!req.user.roomCode) {
    return res.status(403).json({ message: "Not in a room" })
  }
  req.room = await Room.findOne({ _id: req.user.roomCode });
  if (!req.room) {
    return res.status(404).json({ message: "Room not found" })
  } else {
    next();
  }
}

async function getRoster(req, res, next) {
  if (!req.body.rosterID) {
    return res.status(400).json({ message: "No rosterID found" })
  }
  req.roster = req.room.rosters.filter(obj => {
    return obj._id == req.body.rosterID
  })[0];
  if (!req.roster) {
    return res.status(404).json({ message: "Roster not found" })
  } else {
    next();
  }
}

module.exports = router;
