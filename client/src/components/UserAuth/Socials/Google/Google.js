import { useContext } from "react";
import { Context } from '../../../../App';
import axios from 'axios';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ReactComponent as Logo } from './Google.svg';

const Google = () => {

    const setErrorView = useContext(Context).setErrorView;

    const signUp = async () => {

        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        try {
            const userAuth = await signInWithPopup(auth, provider);
            await axios.post(`${process.env.REACT_APP_API_URI}/auth/register`, {
                user: userAuth.user,
            })
        } catch (err) {
            if(err.code === 'auth/popup-closed-by-user') return;
            if(err.code === 'auth/cancelled-popup-request') return;
            if(err.code === 'auth/popup-blocked') return alert('Allow popups to log in with this service');
            setErrorView(err.message);
        } 
    }


    return(
        <Logo onClick={signUp} className='social-logo'/>
    )
}

export default Google;