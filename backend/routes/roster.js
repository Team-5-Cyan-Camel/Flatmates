var express = require("express");
var router = express.Router();

/* POST new roster. */
router.post("/", function (req, res, next) {
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

module.exports = router;
