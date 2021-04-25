import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    socketID: String,
    username: String, // TODO: should be enforced unique?
    password: String,
    roomCode: String,
    isHost: Boolean,
    contactDetails: String,
    name: String,
    phoneNumber: String,
    sessionID: String
});

export default mongoose.model('User', userSchema);