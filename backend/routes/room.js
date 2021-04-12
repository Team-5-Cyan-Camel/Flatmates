var express = require('express');
var router = express.Router();

/* POST a room to be created */
router.post('/', function(req, res, next) {
    const responseBody = {RoomCode : "XXXX"}
    res.status(201).json(responseBody)
});


/* POST a request to join a room */
router.post('/join', function(req, res, next) {
    res.status(201);
});

/* PACH room details and remove the user from the room */
router.patch('/leave', function(req, res, next) {
    res.status(200);
});


/* GET all information for a room */
router.get('/', function(req, res, next) {
    // TODO: representation of user, reminder, expenses, roster is for illustration only currently
    const responseBody = {Code: "XXXX", Users: ["User1", "User2", "User3"], Reminders: ["R1", "R2"], Expenses: [], Roster: []};
    res.status(200).json(responseBody);
});


/* DELETE a room */
router.delete('/', function(req, res, next) {
    // check the user is the room owner
    // delete the room
    res.status(200)
});
    










module.exports = router;
