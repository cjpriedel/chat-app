import React from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import '../App.css';



export const UserSignOut = () => {
    const auth = firebase.auth()
    return auth.currentUser && 
    
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    
  }