import { useState } from "react";
import Register from './Register/Register';
import LogIn from './LogIn/LogIn';
import Socials from './Socials/Socials';
import './UserAuth.css';
import { ReactComponent as Logo } from '../Logos/devchallenges.svg';
import { ReactComponent as LightLogo } from '../Logos/devchallenges-light.svg';

const UserAuth = () => {

    const [isNew, setIsNew] = useState(false);

    const toggleNew = () => {
        setIsNew(!isNew);
    }

    return(
        <div className="auth-box">
            <Logo className='logo' />
            <LightLogo className='l-logo' />
            {isNew ? <Register /> : <LogIn />}
            <Socials />
            <p className='you-new'>
                {isNew ? "Already a member?" : "Don't have an account yet?"}
                <button onClick={toggleNew}>
                    {isNew ? "Login" : "Register"}
                </button>
            </p>
        </div>
    )
}

export default UserAuth;