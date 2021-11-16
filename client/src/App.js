import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import UserAuth from './components/UserAuth/UserAuth';
import AuthorizedView from './components/Authorized/AuthorizedView';
import UserActions from './components/UserActions/UserActions';
import { ReactComponent as Logo } from './components/Logos/devchallenges.svg';
import { ReactComponent as LightLogo } from './components/Logos/devchallenges-light.svg';
import { ThreeDots } from '@agney/react-loading';

export const Context = React.createContext();

function App() {
  
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_FB_ID,
    measurementId: process.env.REACT_APP_MEASURE_ID
  };
  const app = initializeApp(firebaseConfig);
  const [hasUser, setUser] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserInfo = async(userID) => {
    try {
        const user_id = userID;
        const response = await axios.get(`${process.env.REACT_APP_API_URI}/user/profile`, {
            params: {
                id: user_id
            }
        })
        setUserData(response.data);
    } catch(err) {
        console.log(err);
    }
}

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
        getUserInfo(user.uid);
        setLoading(false);
      } else {
        setUser(false);
        setLoading(false);
      }
    });
  }, []);

  if(!loading){
    return (
      <Context.Provider value={{ userData: userData, refreshUser: getUserInfo }}>
      {hasUser ?
        <div id="top-banner">
          <Logo  id="light-mode-logo" />
          <LightLogo id="dark-mode-logo" />
          <UserActions />
        </div>
        : 
        null
      }
      <div className="App">
        {hasUser ? <AuthorizedView /> : <UserAuth />}
        <div className={`credits ${hasUser? null : 'auth-phase'}`}>
          <p id="myName">created by <a href="https://devchallenges.io/portfolio/SantiagoJavierRubio" rel="noreferrer" target="_blank">Santiago Javier Rubio</a></p>
          <p><a href="https://devchallenges.io/" rel="noreferrer" target="_blank">devChallenges.io</a></p>
        </div>
      </div>
      </Context.Provider>
      );
  } else {
    return(
      <ThreeDots className="loading-dots"/>
    )
  }
}
  
  export default App;
  