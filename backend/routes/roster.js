var express = require("express");
var router = express.Router();
var User = require('../mongo/User');
var Room = require('../mongo/Room');


/* POST new roster. */
router.post("/", getUser, getRoom, function (req, res, next) {
  console.log(req.user)
  res.status(201).json({ rosterID: "jkasd" });
});

/* DELETE specified roster. */
router.delete("/", function (req, res, next) {
  res.status(200).send("roster successfully deleted");
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
    res.status(404).json({ message: "Room not found" })
  } else {
    next();
  }
}

module.exports = router;
