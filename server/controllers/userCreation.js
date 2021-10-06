import Profile from '../models/Profile.js';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from '../fb_config.js';

const app = initializeApp(firebaseConfig);

export const registerEmail = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const auth = getAuth();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const user_profile = new Profile({ userID: user.uid, email: user.email });
        await user_profile.save();
        res.status(201).json(user_profile);
    } catch(error) {
        if(error.code == 'auth/email-already-in-use'){
            res.json({ error: 'used-mail' })
        } else {
            res.status(409).json({ message: error.message });
        }
    }
}

export const registerGoogle = async (req, res) => {
    const user = req.body.user;
    try {
        const user_profile = new Profile({ userID: user.uid, email: user.email, name: user.displayName, img: user.photoURL });
        await user_profile.save();
        res.status(201).json(user_profile);
    } catch(error) {
        res.status(409).json({ message: error.message });
    }

}
