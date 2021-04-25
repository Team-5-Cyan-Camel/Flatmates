const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    identifier: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    totalCost: Number,
    cost: Number, // cost per person (divided by number of users). Could remove this field.
    users: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    date: Date
});

module.exports = mongoose.model('expense', expenseSchema);