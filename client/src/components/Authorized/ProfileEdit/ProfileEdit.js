import { useState, useContext } from 'react';
import { Context } from '../../../App';
import axios from 'axios';
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import PhotoEdit from './PhotoEdit/PhotoEdit';
import './ProfileEdit.css';

const ProfileEdit = ({ toggleEdit }) => {

    const { userData, refreshUser, setErrorView } = useContext(Context);
    const { userID, name, email, phone, bio, img } = userData;
    const [authError, setError] = useState({type: null, message: null});

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
        if(formData.email !== email){
            try {
                await updateEmail(auth.currentUser, formData.email);
            } catch(err) {
                return handleError(err)
            }
        }
        if(formData.password) {
            try {
                await updatePassword(auth.currentUser, formData.password);
            } catch(err) {
                return handleError(err);
            }
        }
        try {
            await axios.post(`${process.env.REACT_APP_API_URI}/user/profile_edit`, formData);
        } catch(err) {
            return handleError(err);
        }
        toggleEdit();
    }

    const handleError = (error) => {
        const code = error.code;
        if(code === 'auth/weak-password') return setError({type: 'password', message: 'Password should be at least 6 characters'});
        if(code === 'auth/email-already-in-use') return setError({type: 'user', message: 'This mail is already in use!'});
        if(code === 'auth/internal-error') return alert('Something went wrong, try again.');
        return setErrorView(error.message);
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
                <PhotoEdit toggleEdit={toggleEdit} />
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
                {authError.type === 'user' ? <p className="error-msg">*{authError.message}</p> : null}
                <label htmlFor="email">Email</label>
                <input type='email' name='email' placeholder={email || "Enter your email..."} />
            </div>
            <div className="form-element">
                {authError.type === 'password' ? <p className="error-msg">*{authError.message}</p> : null}
                <label htmlFor="password">Password</label>
                <input type='password' name='password' placeholder='************' autoComplete='new-password'/>
            </div>
            <input type='submit' value='Save' className="submit-btn" id="edit-submit" />
        </form>
        </>
    )
}

export default ProfileEdit;