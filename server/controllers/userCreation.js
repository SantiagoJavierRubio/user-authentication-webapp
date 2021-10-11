import Profile from '../models/Profile.js';

export const registerUser = async (req, res) => {
    const user = req.body.user;
    const new_profile = {
        userID: user.uid,
        email: user.email,
        name: user.displayName ? user.displayName : null,
        img: user.photoURL ? user.photoURL : null 
    }
    try {
        const alreadyExists = await Profile.findOne({userID: user.uid});
        if(!alreadyExists){
            const user_profile = new Profile(new_profile);
            await user_profile.save();
        }
        res.sendStatus(201);
    } catch(error) {
        res.status(409).json({ message: error.message });
    }

}
