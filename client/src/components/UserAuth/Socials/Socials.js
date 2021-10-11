import React from "react";
import Google from './Google/Google';
import GitHub from "./GitHub/GitHub";
import Facebook from "./Facebook/Facebook";
import './Socials.css';

const Socials = () => {
    return(
        <div className='socials-login'>
            <p>or continue with any of these social profiles</p>
            <div className='social-logos'>
                <Google />
                <GitHub />
                <Facebook />
            </div>
        </div>
    )
}

export default Socials;