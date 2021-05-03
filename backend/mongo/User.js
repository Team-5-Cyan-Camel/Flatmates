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
    isHost: {
        type: Boolean,
        default: false,
    },
    roomCode: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room',
    },
    email: String,
    name: String,
    phoneNumber: String,
    socketID: String,
    sessionID: String,
});

module.exports = mongoose.model("User", userSchema);
