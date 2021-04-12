var express = require('express');
var router = express.Router();

/* POST user register. */
router.post('/register', function(req, res, next) {
  res.status(201).send('user registered');
});

/* POST user login. */
router.post('/login', function(req, res, next) {
  res.status(200).send('user logged in');
});

module.exports = router;
