import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ThreeDots } from '@agney/react-loading';
import { getAuth } from "firebase/auth";
import Profile from './Profile/Profile';
import ProfileEdit from "./ProfileEdit/ProfileEdit";

const AuthorizedView = () => {

    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [toEdit, setEdit] = useState(false);
    const auth = getAuth();

    const getUserInfo = async() => {
        setLoading(true);
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

    const toggleEdit = () => {
        if(toEdit){
            getUserInfo();
        }
        setEdit(!toEdit);
    }

    return(
        <div>
            <h1>Welcome</h1>
            {isLoading ? <ThreeDots /> : (
            <>
                {toEdit ? <ProfileEdit user={user} toggleEdit={toggleEdit} /> :
                <Profile user={user} toggleEdit={toggleEdit} />}
            <button onClick={handleSignOut}>Sign Out</button>
            </>
            )}
        </div>
    )
}

export default AuthorizedView;