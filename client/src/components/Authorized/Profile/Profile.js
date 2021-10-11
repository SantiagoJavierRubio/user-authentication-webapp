import React from "react";

const Profile = (props) => {

    const { user, toggleEdit } = props;
    const { userID, name, email, phone, bio, img } = user;

    return(
        <div>
            <button onClick={toggleEdit}>Edit profile</button>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Phone number: {phone}</p>
            <p>About: {bio}</p>
            <p>Photo: <img src={img} width='100px'/></p>
        </div>
    )
}

export default Profile;