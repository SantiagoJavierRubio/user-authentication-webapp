import { useState, useContext } from "react";
import { Context } from '../../App';
import Profile from './Profile/Profile';
import ProfileEdit from "./ProfileEdit/ProfileEdit";
import './AuthorizedView.css';

const AuthorizedView = () => {

    const { userData, refreshUser } = useContext(Context);
    const [toEdit, setEdit] = useState(false);

    const toggleEdit = () => {
        if(toEdit){
            refreshUser(userData.userID);
        }
        setEdit(!toEdit);
    }

    return(
        <div id="authorized-view">
            {toEdit ? <ProfileEdit toggleEdit={toggleEdit} /> :
            <Profile toggleEdit={toggleEdit} />}
        </div>
    )
}

export default AuthorizedView;