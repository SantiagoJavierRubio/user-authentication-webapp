import React from "react";
import axios from 'axios';
import { getAuth, updateEmail, updatePassword } from "firebase/auth";

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
        if(formData.email != email){
            updateEmail(auth.currentUser, formData.email);
        }
        if(formData.password) {
            updatePassword(auth.currentUser, formData.password);
        }
        toggleEdit();
    }

    return(
        <form onSubmit={handleSubmit}>
            <p>Photo: <img src={img} width='100px'/></p>
            <input type='text' name='username' placeholder={name || "Enter your name..."} />
            <input type='text' name='bio' placeholder={bio || "Enter your bio..."} />
            <input type='tel' name='phone' placeholder={phone || "Enter your phone..."} /> 
            <input type='email' name='email' placeholder={email || "Enter your email..."} />
            <input type='password' name='password' placeholder='************' autoComplete='new-password'/>
            <input type='submit' value='SAVE' />
        </form>
    )
}

export default ProfileEdit;