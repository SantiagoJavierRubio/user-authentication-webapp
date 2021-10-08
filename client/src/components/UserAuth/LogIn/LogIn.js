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
        <div>
            <h1>Log In</h1>
            <form onSubmit={logUser}>
                <input type="email" name="mail" />
                <input type="password" name="psw" />
                <input type="submit" value="submit" />
            </form>
        </div>
    )
}

export default LogIn;