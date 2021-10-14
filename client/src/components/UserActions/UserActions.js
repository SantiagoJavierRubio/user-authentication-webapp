import React from "react";
import Dropdown from './Dropdown/Dropdown';
import './UserActions.css';

const UserActions = ({ user }) => {

    
    return(
        <div id="user-actions">
            {user?.img ? <img src={user.img} alt=""/> : <span className="material-icons">account_circle</span>}
            <p className="username">{user?.name ? user.name : user?.email}</p>
            <Dropdown />
        </div>
    )

}

export default UserActions;