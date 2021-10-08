import { useState } from "react";
import Register from './Register/Register';
import LogIn from './LogIn/LogIn';
import Socials from './Socials/Socials';

const UserAuth = () => {

    const [isNew, setIsNew] = useState(true);

    const toggleNew = () => {
        setIsNew(!isNew);
    }

    return(
        <div>
            {isNew ? <Register /> : <LogIn />}
            <Socials />
            <p>
                {isNew ? "Already a member?" : "Don't have an account yet?"}
                <button onClick={toggleNew}>
                    {isNew ? "Login" : "Register"}
                </button>
            </p>
        </div>
    )
}

export default UserAuth;