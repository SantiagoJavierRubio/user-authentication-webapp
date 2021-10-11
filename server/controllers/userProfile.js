import Profile from '../models/Profile.js';

export const getUserProfile = async (req, res) => {
    const user_id = req.query.id;
    try {
        const userProfile = await Profile.findOne({userID: user_id});
        if(userProfile){
            res.status(200).json(userProfile);
        } else {
            res.status(404).json({message: "User not found"});
        }
    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

export const editProfile = async (req, res) => {
    const new_data = req.body;
    try {
        const updatedProfile = await Profile.findOneAndUpdate({userID: new_data.userID}, new_data, { new: true });
        res.status(200).json(updatedProfile);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
}