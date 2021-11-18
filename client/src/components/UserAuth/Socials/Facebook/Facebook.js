import { useContext } from "react";
import { Context } from '../../../../App';
import axios from 'axios';
import { getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, linkWithPopup } from "firebase/auth";
import { ReactComponent as Logo } from './Facebook.svg';

const Facebook = () => {

    const setErrorView = useContext(Context).setErrorView;
    
    const signUp = async () => {
        
        const auth = getAuth();
        const provider = new FacebookAuthProvider();
        try {
            const userAuth = await signInWithPopup(auth, provider);
            await axios.post(`${process.env.REACT_APP_API_URI}/auth/register`, {
                user: userAuth.user,
            })
        } catch (err) {
            if(err.code === 'auth/popup-closed-by-user') return;
            if(err.code === 'auth/cancelled-popup-request') return;
            if(err.code === 'auth/popup-blocked') return alert('Allow popups to log in with this service');
            if(err.code === 'auth/account-exists-with-different-credential') return linkWithGoogle(err);
            setErrorView(err.message);
        } 
    }

    const linkWithGoogle = async (err) => {
        const auth = getAuth();
        alert('You have already an account with the same email. Continue with google to link both services.');
        try {
            const provider = new GoogleAuthProvider();
            const usr = await signInWithPopup(auth, provider);
            const fb_provider = new FacebookAuthProvider();
            await linkWithPopup(usr.user, fb_provider);
        } catch(err) {
            setErrorView(err.message)
        }
    }

    return(
        <Logo onClick={signUp} className='social-logo'/>
    )
}

export default Facebook;