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