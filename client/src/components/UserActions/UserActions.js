import { useState, useEffect, useContext } from "react";
import { Context } from '../../App';
import Dropdown from './Dropdown/Dropdown';
import './UserActions.css';

const UserActions = () => {

    const { userData } = useContext(Context);
    const [userImg, setImg] = useState(userData?.img);

    const handleImgError = () => {
        setImg(null);
    }

    useEffect(()=> {
        setImg(userData?.img);
    }, [userData])

    if(userData) {
        return(
        <div id="user-actions">
            {userImg ? 
                <img src={userImg} alt="" onError={handleImgError}/> 
                :
                <span className="material-icons">account_circle</span>
            }
            <p className="username">{userData?.name ? userData.name : userData?.email}</p>
            <Dropdown />
        </div>
    )
    } else {
        return null;
    }

}

export default UserActions;