const mongoose = require('mongoose');

const taskSchema = require('./Task');

const rosterSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    tasks: {
        type: [taskSchema]
    },
    assignedUsers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }]
});

module.exports = mongoose.model('Roster', rosterSchema);
