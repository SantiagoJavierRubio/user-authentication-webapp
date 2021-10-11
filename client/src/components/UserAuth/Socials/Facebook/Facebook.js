import React from "react";
import axios from 'axios';
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { ReactComponent as Logo } from './Facebook.svg';

const Facebook = () => {

    const signUp = async () => {

        const provider = new FacebookAuthProvider();
        const auth = getAuth();
        try {
            const userAuth = await signInWithPopup(auth, provider);
            const response = await axios.post(`${process.env.REACT_APP_API_URI}/auth/register`, {
                user: userAuth.user,
                token: userAuth._tokenResponse
            })
        } catch (err) {
            console.log(err)
        } 
    }


    return(
        <Logo onClick={signUp} className='social-logo'/>
    )
}

export default Facebook;