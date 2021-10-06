import React, { useState } from 'react';
import axios from 'axios';
import Google from './Google/Google';


const Register = () => {
    const [formInput, setFormInput] = useState({email: null, password: null});
    
    const createUser = async (e) => {
        e.preventDefault();
        const {email, password} = formInput;
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URI}/auth/register/email`, {
                email: email,
                password: password
            })
            console.log(response.data);
        } catch(err) {
            console.log(err);
        }
    }

    const handleMail = e => {
        setFormInput({email: e.target.value, password: formInput.password})
    }
    const handlePass = e => {
        setFormInput({email: formInput.password, password: e.target.value})
    }

    return(
        <div>
            <form onSubmit={createUser}>
                <input type="email" onChange={handleMail} />
                <input type="password" onChange={handlePass} />
                <input type="submit" value="submit" />
            </form>
            <Google />
        </div>
    )
}

export default Register;