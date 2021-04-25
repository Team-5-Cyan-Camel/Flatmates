const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    socketID: String,
    username: String, // TODO: should be enforced unique?
    password: String,
    roomCode: String,
    isHost: Boolean,
    contactDetails: String,
    name: String,
    phoneNumber: String,
    sessionID: String
});

module.exports = mongoose.model('User', userSchema);