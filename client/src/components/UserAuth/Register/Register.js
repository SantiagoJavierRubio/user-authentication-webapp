import React from 'react';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import './Register.css';


const Register = () => {
    
    const createUser = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const email = e.target.mail.value;
        const password = e.target.psw.value;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const response = await axios.post(`${process.env.REACT_APP_API_URI}/auth/register`, {
                user: userCredential.user
            })
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className='inner-box'>
            <p className='auth-title'>
                Join thousands of learners from around the world.
            </p>
            <p className='register-description'>
                Master web development by making real-life projects. There are multiple paths for you to choose
            </p>
            <form onSubmit={createUser} className='user-form'>
                <div className='input-div'>
                    <span className="material-icons">email</span>
                    <input type="email" name="mail" placeholder="Email"/>
                </div>
                <div className='input-div'>
                    <span className="material-icons">lock</span>
                    <input type="password" name="psw" placeholder="Password" />
                </div>
                <input type="submit" value="Start coding now" className='submit-btn'/>
            </form>
        </div>
    )
}

export default Register;