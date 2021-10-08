import React from "react";
import { getAuth } from "firebase/auth";

const AuthorizedView = () => {

    const handleSignOut = () => {
        const auth = getAuth();
        auth.signOut();
    }

    return(
        <div>
            <h1>Welcome</h1>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    )
}

export default AuthorizedView;