import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';

const Google = () => {

    const signUp = async () => {

        const provider = new GoogleAuthProvider();
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
        <button onClick={signUp}>Google</button>
    )
}

export default Google;