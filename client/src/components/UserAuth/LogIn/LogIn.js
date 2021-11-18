import { useState, useContext } from "react";
import { Context } from '../../../App';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LogIn = () => {

    const [authError, setError] = useState({
        type: null,
        message: null
    });

    const setErrorView = useContext(Context).setErrorView;
    
    const logUser = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const email = e.target.mail.value;
        const password = e.target.psw.value;
        if(email === '') return errorHandler({field: 'user', code: 'missing'});
        if(password === '') return errorHandler({field: 'password', code: 'missing'});
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            errorHandler(error);
        }
    }

    const errorHandler = (error) => {
        const code = error.code;
        if(code === 'auth/wrong-password') return setError({type: 'password', message: 'Wrong password!'});
        if(code === 'auth/user-not-found') return setError({type: 'user', message: 'Invalid User!'});
        if(code === 'auth/internal-error') return setError({type: 'firebase', message: 'Something went wrong, try again.'});
        if(code === 'missing') return setError({ type: error.field, message: 'This field is required.'});
        return setErrorView(error.message);
    }


    return(
        <div className="inner-box">
            <h1 className="auth-title">Login</h1>
            <form onSubmit={logUser} className="user-form">
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
                <input type="submit" value="Login" className='submit-btn'/>
            </form>
        </div>
    )
}

export default LogIn;