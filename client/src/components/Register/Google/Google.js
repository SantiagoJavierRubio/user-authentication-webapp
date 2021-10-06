import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from 'axios';

const Google = () => {
    
    const signUp = async () => {
        
        const firebaseConfig = {
            apiKey: "AIzaSyDdY7FFaAKWVs0Dp5JHTyzHXZAFm6khKew",
            authDomain: "user-authentication-webapp.firebaseapp.com",
            projectId: "user-authentication-webapp",
            storageBucket: "user-authentication-webapp.appspot.com",
            messagingSenderId: "799131044527",
            appId: '1:799131044527:web:b12ed73bcedb09a4e4a25a',
            measurementId: "G-GPT4PHST7K"
        };
        const app = initializeApp(firebaseConfig);

        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        try {
            const userAuth = await signInWithPopup(auth, provider);
            const response = await axios.post(`${process.env.REACT_APP_API_URI}/auth/register/google`, {
                user: userAuth.user,
                token: userAuth._tokenResponse
            })
            console.log(response.data)
        } catch (err) {
            console.log(err)
        } 
    }


    return(
        <button onClick={signUp}>Google</button>
    )
}

export default Google;