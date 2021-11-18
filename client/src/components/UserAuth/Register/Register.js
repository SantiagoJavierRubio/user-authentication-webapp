import { useState, useContext } from 'react';
import { Context } from '../../../App';
import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const Register = () => {

    const [authError, setError] = useState({
        type: null,
        message: null
    });

    const setErrorView = useContext(Context).setErrorView;
    
    const createUser = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const email = e.target.mail.value;
        const password = e.target.psw.value;
        if(email === '') return errorHandler({field: 'user', code: 'missing'});
        if(password === '') return errorHandler({field: 'password', code: 'missing'});
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await axios.post(`${process.env.REACT_APP_API_URI}/auth/register`, {
                user: userCredential.user
            })
        } catch (error) {
            errorHandler(error);
        }
    }

    const errorHandler = (error) => {
        const code = error.code;
        if(code === 'auth/weak-password') return setError({type: 'password', message: 'Password should be at least 6 characters'});
        if(code === 'auth/email-already-in-use') return setError({type: 'user', message: 'This mail is already in use!'});
        if(code === 'auth/internal-error') return setError({type: 'firebase', message: 'Something went wrong, try again.'});
        if(code === 'missing') return setError({ type: error.field, message: 'This field is required.'});
        return setErrorView(error.message);
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
                {authError.type === 'user' ? <p className="error-msg">*{authError.message}</p> : null}
                <div className='input-div'>
                    <span className="material-icons">email</span>
                    <input type="email" name="mail" placeholder="Email"/>
                </div>
                {authError.type === 'password' ? <p className="error-msg">*{authError.message}</p> : null}
                <div className='input-div'>
                    <span className="material-icons">lock</span>
                    <input type="password" name="psw" placeholder="Password" />
                </div>
                {authError.type === 'firebase' ? <p className="error-msg">*{authError.message}</p> : null}
                <input type="submit" value="Start coding now" className='submit-btn'/>
            </form>
        </div>
    )
}

export default Register;