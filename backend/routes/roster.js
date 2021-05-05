var express = require("express");
var router = express.Router();
var User = require('../mongo/User');
var Room = require('../mongo/Room');
var Roster = require('../mongo/Roster');
const Task = require("../mongo/Task");

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
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.status(200).json(room.rosters);
  socketRosterUpdate(room._id, room.rosters);
});

/* DELETE specified roster. */
router.delete("/", getUser, getRoom, getRoster, async function (req, res, next) {
  let room;
  try {
    req.room.rosters.pull({ _id: req.body.rosterID });
    room = await req.room.save();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.status(200).json(room.rosters);
  socketRosterUpdate(room._id, room.rosters);
});

/* PATCH rotate a specified roster. */
router.patch("/rotate", getUser, getRoom, getRoster, async function (req, res, next) {
  let lastUser = req.roster.assignedUsers.pop();
  req.roster.assignedUsers.unshift(lastUser);
  let room;
  try {
    room = await req.room.save();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.status(200).json(room);
  socketRosterUpdate(room._id, room.rosters);
});

/* POST add a new task to a roster. */
router.post("/task", getUser, getRoom, getRoster, async function (req, res, next) {
  var userIndex = req.roster.assignedUsers.map((e)=> { return e._id }).indexOf(req.body.assignedUserID);
  if (userIndex === -1) {
    return res.status(500).json({ message: "Could not find user in assignedUsers" });
  }

  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,
    userIndex: userIndex,
    dueType: req.body.dueTupe,
    due: req.body.due
  });

  let room;
  try {
    req.roster.tasks.push(newTask);
    room = await req.room.save();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.status(200).json(room.rosters);
  socketRosterUpdate(room._id, room.rosters);
});

/* DELETE remove task from roster. */
router.delete("/task", getUser, getRoom, getRoster, async function (req, res, next) {
  let room;
  try {
    req.roster.tasks.pull({ _id: req.body.taskID });
    room = await req.room.save();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.status(200).json(room.rosters);
  socketRosterUpdate(room._id, room.rosters);
});


function socketRosterUpdate(roomID, roster) {
  if (global.io) {
    roomID = JSON.stringify(roomID).replace(/(^")|("$)/g, "");
    global.io.in(roomID).emit('roster_update', roster);
  }
}

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
  req.room = await Room.findOne({ _id: req.user.roomCode })
  .populate("users", "_id username name")
  .populate("rosters.assignedUsers", "_id username name");
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
