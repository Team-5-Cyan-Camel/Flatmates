var express = require("express");
var router = express.Router();
var User = require('../mongo/User');

/* POST user register. */
router.post("/register", async function (req, res, next) {
  console.log(req.body.socketID)
  const newUser = new User({
    socketID: req.body.socketID,
    username: req.body.username,
    password: req.body.password,
    roomCode: req.body.roomCode,
    isHost: req.body.isHost,
    contactDetails: req.body.contactDetails,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    sessionID: req.body.sessionID,
  });

  // newUser.save((err) => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(400).json({ error: err });
  //   }
  //   return res.status(201).json(newUser);
  // });

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
