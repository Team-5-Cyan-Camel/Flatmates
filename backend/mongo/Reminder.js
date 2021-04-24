import mongoose from 'mongoose';


const reminderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
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

export default mongoose.model('Reminder', reminderSchema);