import { useState, useEffect } from "react";
import Dropdown from './Dropdown/Dropdown';
import './UserActions.css';

const UserActions = ({ user }) => {

    const [userImg, setImg] = useState();

    const handleImgError = () => {
        setImg(null);
    }

    useEffect(()=> {
        setImg(user?.img);
    }, [user])

    return(
        <div id="user-actions">
            {userImg ? 
                <img src={userImg} alt="" onError={handleImgError}/> 
                :
                <span className="material-icons">account_circle</span>
            }
            <p className="username">{user?.name ? user.name : user?.email}</p>
            <Dropdown />
        </div>
    )

}

export default UserActions;