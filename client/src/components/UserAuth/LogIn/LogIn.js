import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LogIn = () => {
    
    const logUser = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const email = e.target.mail.value;
        const password = e.target.psw.value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
        }
    }


    return(
        <div className="inner-box">
            <h1 className="auth-title">Login</h1>
            <form onSubmit={logUser} className="user-form">
                <div className='input-div'>
                    <span className="material-icons">email</span>
                    <input type="email" name="mail" placeholder="Email"/>
                </div>
                <div className='input-div'>
                    <span className="material-icons">lock</span>
                    <input type="password" name="psw" placeholder="Password" />
                </div>
                <input type="submit" value="Login" className='submit-btn'/>
            </form>
        </div>
    )
}

export default LogIn;