const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    userIndex: {
        type: Number,
    },
    dueType: {
        type: String
    },
    due: {
        type: String
    }    
});

module.exports = mongoose.model('Task', taskSchema);
