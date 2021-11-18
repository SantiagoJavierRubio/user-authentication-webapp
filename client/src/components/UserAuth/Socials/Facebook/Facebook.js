import { useContext } from "react";
import { Context } from '../../../../App';
import axios from 'axios';
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { ReactComponent as Logo } from './Facebook.svg';

const Facebook = () => {

    const setErrorView = useContext(Context).setErrorView;

    const signUp = async () => {

        const provider = new FacebookAuthProvider();
        const auth = getAuth();
        try {
            const userAuth = await signInWithPopup(auth, provider);
            await axios.post(`${process.env.REACT_APP_API_URI}/auth/register`, {
                user: userAuth.user,
                token: userAuth._tokenResponse
            })
        } catch (err) {
            if(err.code === 'auth/popup-closed-by-user') return;
            if(err.code === 'auth/cancelled-popup-request') return;
            setErrorView(err.message);
        } 
    }


    return(
        <Logo onClick={signUp} className='social-logo'/>
    )
}

export default Facebook;