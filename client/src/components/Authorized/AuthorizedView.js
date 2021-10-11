import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ThreeDots } from '@agney/react-loading';
import { getAuth } from "firebase/auth";

const AuthorizedView = () => {

    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(true);
    const auth = getAuth();

    const getUserInfo = async() => {
        try {
            const user_id = auth.currentUser.uid;
            const response = await axios.get(`${process.env.REACT_APP_API_URI}/user/profile`, {
                params: {
                    id: user_id
                }
            })
            setUser(response.data);
        } catch(err) {
            console.log(err);
        }
        setLoading(false);
    }
    useEffect(() => {
        getUserInfo();
    }, [])

    const handleSignOut = () => {
        auth.signOut();
    }

    return(
        <div>
            <h1>Welcome</h1>
            {isLoading ? <ThreeDots /> : (
            <>
                {user.name ? <h2>{user.name}</h2> : <p>No user</p>}
                <button onClick={handleSignOut}>Sign Out</button>
            </>
            )}
        </div>
    )
}

export default AuthorizedView;