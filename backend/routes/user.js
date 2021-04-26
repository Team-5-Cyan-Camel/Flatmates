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

  // Saving user and setting cookies
  let user;
  try {
    user = await newUser.save();
    await setSessionCookie(req, res, user);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

/* POST user login. */
router.post("/login", async function (req, res, next) {
  // Obtain user
  let user;
  try {
    user = await User.findOne({
      username: req.body.username,
      password: req.body.password
    })
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  // If user does not exist, credentials were incorrect
  if (user === null) {
    return res.status(401).json({ message: "Incorrect username or password" });
  }

  // Setting cookies
  try {
    await setSessionCookie(req, res, user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  // Creating response
  return res.status(200).json({
    inRoom: user.roomCode ? true : false,
    roomCode: user.roomCode
  });
});

async function setSessionCookie(req, res, user) {
  return new Promise(async (resolve) => {
    // Creating and setting new cookie
    let frontCookie = req.cookies.sessionID;
    let backCookie = user.sessionID;

    if (frontCookie !== backCookie) {
      let newCookie = uuid.v4()
      // Setting for frontend response
      res.cookie('sessionID', newCookie, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
      // Setting for database
      await User.updateOne(
        { _id: user._id },
        { $set: { sessionID: newCookie } },
      );
    }
    resolve();
  });
}

module.exports = router;
