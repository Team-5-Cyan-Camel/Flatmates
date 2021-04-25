var express = require("express");
var router = express.Router();
var User = require('../mongo/User');
var uuid = require('uuid')

/* POST user register. */
router.post("/register", async function (req, res, next) {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    contactDetails: req.body.contactDetails,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber
  });

  let user;
  try {
    user = await newUser.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  // Creating and setting new cookie
  let cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    let sessionID = uuid.v4()
    // Setting for frontend response
    res.cookie('sessionID', sessionID, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
    // Setting for database
    try {
      await User.updateOne(
          {_id: user._id},
          {$set: {sessionID: sessionID}},
      );
    } catch (error) {
      res.status(500).json({message: error.message});
    }  
  }

  res.status(200).json(user);
});

/* POST user login. */
router.post("/login", function (req, res, next) {
  res.status(200).send("user logged in");
});

module.exports = router;
