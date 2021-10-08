import './App.css';
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import UserAuth from './components/UserAuth/UserAuth';
import AuthorizedView from './components/Authorized/AuthorizedView';

function App() {
  
  const firebaseConfig = {
    apiKey: "AIzaSyDdY7FFaAKWVs0Dp5JHTyzHXZAFm6khKew",
    authDomain: "user-authentication-webapp.firebaseapp.com",
    projectId: "user-authentication-webapp",
    storageBucket: "user-authentication-webapp.appspot.com",
    messagingSenderId: "799131044527",
    appId: '1:799131044527:web:b12ed73bcedb09a4e4a25a',
    measurementId: "G-GPT4PHST7K"
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
  