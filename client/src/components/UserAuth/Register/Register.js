import React from 'react';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const Register = () => {
    
    const createUser = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const email = e.target.mail.value;
        const password = e.target.psw.value;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const response = await axios.post(`${process.env.REACT_APP_API_URI}/auth/register/email`, {
                user: userCredential.user
            })
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            <form onSubmit={createUser}>
                <input type="email" name="mail" />
                <input type="password" name="psw" />
                <input type="submit" value="submit" />
            </form>
        </div>
    )
}

export default Register;