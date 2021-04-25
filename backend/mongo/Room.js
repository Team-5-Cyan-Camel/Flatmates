const mongoose = require('mongoose');

const rosterSchema =  require('./Roster');
const reminderSchema =  require('./Reminder');
const expenseSchema = require('./Expense');


const roomSchema = mongoose.Schema({
    host: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    rosters: {
        type: [rosterSchema]
    },
    reminders: {
        type: [reminderSchema]
    },
    expenses: {
        type: [expenseSchema]
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }]
});

module.exports = mongoose.model('Room', roomSchema);
