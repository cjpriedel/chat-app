import React from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import '../App.css';


export const UserSignIn = () => {
    const auth = firebase.auth()
    
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
    return <button className="sign-in" onClick={signInWithGoogle}>Sign In With Google</button>
  }