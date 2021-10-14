import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import UserAuth from './components/UserAuth/UserAuth';
import AuthorizedView from './components/Authorized/AuthorizedView';
import UserActions from './components/UserActions/UserActions';
import { ReactComponent as Logo } from './components/Logos/devchallenges.svg';
import { ReactComponent as LightLogo } from './components/Logos/devchallenges-light.svg';


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

  const getUserInfo = async(user) => {
    try {
        const user_id = user.uid;
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
        getUserInfo(user);
      } else {
        setUser(false);
      }
    });
  }, []);

  return (
    <>
    {hasUser ?
      <div id="top-banner">
        <Logo />
        <UserActions user={userData}/>
      </div>
      : 
      null
    }
    <div className="App">
      {hasUser ? <AuthorizedView /> : <UserAuth />}
    </div>
    </>
    );
  }
  
  export default App;
  