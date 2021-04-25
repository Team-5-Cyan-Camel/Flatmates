const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userIndex: {
        type: Number,
    },
    assignedUsers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    dueType: {
        type: String
    },
    due: {
        type: String
    }    
});

module.exports = mongoose.model('Task', taskSchema);
