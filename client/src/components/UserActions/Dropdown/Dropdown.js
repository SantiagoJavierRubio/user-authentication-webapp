import { useRef, useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import './Dropdown.css';


const Dropdown = () => {
    
    const [drop, setDrop] = useState(false);
    
    const toggleDrop = () => {
        setDrop(!drop);
    }

    const handleSignOut = () => {
        const auth = getAuth();
        auth.signOut();
    }

    const handleProfileNav = () => {
        window.location.reload(false);
    }

    // function to detect clicks outside element
    const useOutsideAlerter = (ref) => {
        useEffect(() => {
            // hide dropdown if user clicks outside
            const handleClickOutside = (e) => {
                if (ref.current && !ref.current.contains(e.target)) {
                    setDrop(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return(
        <div ref={wrapperRef}>
        <button onClick={toggleDrop} id="toggle-btn">
            <span className="material-icons">
                {drop ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            </span>
        </button>
        {drop ? 
            <div id="dropdown-box">
                <button className="option-btn" onClick={handleProfileNav}>
                    <span className="material-icons">account_circle</span>
                    <p>My profile</p>
                </button>
                <div className="divider"></div>
                <button className="logout-btn" onClick={handleSignOut}>
                    <span className="material-icons">logout</span> 
                    <p>Logout</p>
                </button>
            </div>
            :
            null
        }
        </div>
    )
}

export default Dropdown;