import React from "react";
import axios from 'axios';
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { ReactComponent as Logo } from './Github.svg';

const GitHub = () => {

    const signUp = async () => {

        const provider = new GithubAuthProvider();
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

export default GitHub;