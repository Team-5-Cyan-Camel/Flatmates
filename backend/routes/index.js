var express = require('express');
var router = express.Router();

/* GET root. */
router.get('/', function(req, res, next) {
  res.send('This is the index for the Flatmates server');
});

module.exports = router;
