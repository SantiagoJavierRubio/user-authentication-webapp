import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    googleId: {
        type: String,
        default: null
    }
}, {collection: 'Users'});

const User = mongoose.model('User', userSchema);

export default User;