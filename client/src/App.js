import './App.css';
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import UserAuth from './components/UserAuth/UserAuth';
import AuthorizedView from './components/Authorized/AuthorizedView';

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

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, []);

  return (
    <div className="App">
      {hasUser ? <AuthorizedView /> : <UserAuth />}
    </div>
    );
  }
  
  export default App;
  