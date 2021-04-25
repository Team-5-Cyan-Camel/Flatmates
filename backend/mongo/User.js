const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roomCode: String,
    isHost: {
        type: Boolean,
        default: false,
    },
    contactDetails: String,
    name: String,
    phoneNumber: String,
    socketID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room',
    },
    sessionID: String,
});

module.exports = mongoose.model("User", userSchema);
