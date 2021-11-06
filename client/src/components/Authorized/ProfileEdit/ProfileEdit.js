import React from "react";
import axios from 'axios';
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import PhotoEdit from './PhotoEdit/PhotoEdit';
import './ProfileEdit.css';

const ProfileEdit = (props) => {

    const { user, toggleEdit } = props;
    const { userID, name, email, phone, bio, img } = user;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const formData = {
            userID: userID,
            name: e.target.username.value || name,
            email: e.target.email.value || email,
            phone: e.target.phone.value || phone,
            bio: e.target.bio.value || bio,
            password: e.target.password.value
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URI}/user/profile_edit`, formData);
        } catch(err) {
            console.log(err);
        }
        if(formData.email !== email){
            updateEmail(auth.currentUser, formData.email);
        }
        if(formData.password) {
            updatePassword(auth.currentUser, formData.password);
        }
        toggleEdit();
    }

    return(
        <>
        <button onClick={toggleEdit} className="back-btn"> 
            <span className="material-icons">arrow_back_ios</span> Back
        </button>
        <form onSubmit={handleSubmit} id="change-profile-form">
            <div className="edit-head">
                <h2>Change info</h2>
                <p>Changes will be reflected to all the services</p>
            </div>
            <div className="photo-edit">
                {/* <img src={img} alt="Profile picture"/> */}
                <PhotoEdit user={user} />
                <p>CHANGE PHOTO</p>
            </div>
            <div className="form-element">
                <label htmlFor="username">Name</label>
                <input type='text' name='username' placeholder={name || "Enter your name..."} />
            </div>
            <div className="form-element">
                <label htmlFor="bio">About</label>
                <textarea name='bio' id="bio-input" placeholder={bio || "Tell us about you..."} />
            </div>
            <div className="form-element">
                <label htmlFor="tel">Phone</label>
                <input type='tel' name='phone' placeholder={phone || "Enter your phone..."} /> 
            </div>
            <div className="form-element">
                <label htmlFor="email">Email</label>
                <input type='email' name='email' placeholder={email || "Enter your email..."} />
            </div>
            <div className="form-element">
                <label htmlFor="password">Password</label>
                <input type='password' name='password' placeholder='************' autoComplete='new-password'/>
            </div>
            <input type='submit' value='Save' className="submit-btn" id="edit-submit" />
        </form>
        </>
    )
}

export default ProfileEdit;