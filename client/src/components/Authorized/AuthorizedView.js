import React, { useState, useEffect } from "react";
import axios from 'axios';
import { ThreeDots } from '@agney/react-loading';
import { getAuth } from "firebase/auth";
import Profile from './Profile/Profile';
import ProfileEdit from "./ProfileEdit/ProfileEdit";
import './AuthorizedView.css';

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

    const toggleEdit = () => {
        if(toEdit){
            getUserInfo();
        }
        setEdit(!toEdit);
    }

    return(
        <div id="authorized-view">
            {isLoading ? <ThreeDots className="loading-dots"/> : (
            <>
                {toEdit ? <ProfileEdit user={user} toggleEdit={toggleEdit} /> :
                <Profile user={user} toggleEdit={toggleEdit} />}
            </>
            )}
        </div>
    )
}

export default AuthorizedView;