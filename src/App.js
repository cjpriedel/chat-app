import { UserSignIn } from './components/UserSignIn'
import { UserSignOut } from './components/UserSignOut'
import { MessageRoom } from './components/MessageRoom'
// import { userPfpInitial } from './components/ProfilePhotoFunction'
import React, { useState } from "react"
import './App.css';
import { firebaseConfig }from "./FirebaseConfig"

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Authorizes users
import 'firebase/compat/firestore'; // Imports Firebase database

import { useAuthState } from 'react-firebase-hooks/auth';

export default function App() {
    firebase.initializeApp(firebaseConfig) // creates connection to firebase app with config in ./FirebaseConfig
  
  const auth = firebase.auth() // used for authorizing users
  const [user] = useAuthState(auth)
  
  const dailyBgImgFetch = async () => {
    await fetch("https://api.nasa.gov/planetary/apod?api_key=4YozzAGxnEqxnER69BteQfDAvbi9XLoZlP0xOLi9")
    .then((response) => response.json())
    .then((data)=> setBgImg(data.hdurl))
  }
  
  const [bgImg, setBgImg] = useState(() => (dailyBgImgFetch()))
  
  // console.log(userPfpInitial())
  return <>
    <div style={{ backgroundImage:`url(${bgImg})`, backgroundSize: 'cover' }} className="App">
      <header>
        <h1 style={{fontSize:"75px"}}> 🐌</h1>
        <UserSignOut />
      </header>

      <section>
        {user ? <MessageRoom /> : <UserSignIn />}
      </section>
    </div>
  </>
}
