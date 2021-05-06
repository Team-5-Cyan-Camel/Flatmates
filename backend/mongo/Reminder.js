const mongoose = require('mongoose');

const reminderSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    reminder: String,
    date: Date
});

module.exports = mongoose.model('Reminder', reminderSchema);