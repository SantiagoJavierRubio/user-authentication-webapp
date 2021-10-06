import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
    userID: String,
    name: {
        type: String,
        default: null
    },
    email: String,
    phone: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        default: null
    },
    img: {
        type: String,
        default: null
    }
}, {collection: 'Profiles'});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;