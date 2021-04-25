var express = require("express");
var router = express.Router();
var User = require('../mongo/User');

/* POST user register. */
router.post("/register", async function (req, res, next) {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    contactDetails: req.body.contactDetails,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    sessionID: req.body.sessionID,
  });

  try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

/* POST user login. */
router.post("/login", function (req, res, next) {
  res.status(200).send("user logged in");
});

module.exports = router;
