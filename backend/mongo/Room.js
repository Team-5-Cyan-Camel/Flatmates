import mongoose from 'mongoose';

import {rosterSchema} from './Roster';
import {reminderSchema} from './Reminder';
import {expenseSchema} from './Expense';


const roomSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    host: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
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

export default mongoose.model('Room', roomSchema);
