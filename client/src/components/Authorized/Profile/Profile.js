import { useContext } from "react";
import { Context } from '../../../App';

import './Profile.css';

const Profile = (props) => {

    const { toggleEdit } = props;
    const { userData, refreshUser } = useContext(Context);
    const { userID, name, email, phone, bio, img } = userData;

    return(
        <div className="profile-main">
            <div className="profile-main-head">
                <h1>Personal info</h1>
                <p>Basic info, like your name and photo</p>
            </div>
            <div className="profile-box">
                <div className="profile-head-box">
                    <div>
                        <h2>Profile</h2>
                        <p>Some info may be visible to other people</p>
                    </div>
                    <button onClick={toggleEdit}>Edit</button>
                </div>
                <div className="profile-column">
                    <h4 className="profile-item-title">PHOTO</h4>
                    <img src={img} className="profile-item" id="profile-pic" alt="Profile picture"/>
                </div>
                <div className="profile-column">
                    <h4 className="profile-item-title">NAME</h4>
                    <p className="profile-item">{name}</p>
                </div>
                <div className="profile-column">
                    <h4 className="profile-item-title">ABOUT</h4>
                    <p className="profile-item">{bio}</p>
                </div>
                <div className="profile-column">
                    <h4 className="profile-item-title">PHONE</h4>
                    <p className="profile-item">{phone}</p>
                </div>
                <div className="profile-column">
                    <h4 className="profile-item-title">EMAIL</h4>
                    <p className="profile-item">{email}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile;