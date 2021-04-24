import mongoose from 'mongoose';


const expenseSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
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

export default mongoose.model('expense', expenseSchema);