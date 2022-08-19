import { UserSignIn } from './components/UserSignIn'
import { UserSignOut } from './components/UserSignOut'
import { MessageRoom } from './components/MessageRoom'
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

// const UserSignIn = () => {
//   const googleSignIn = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     auth.signInWithPopup(provider);
//   }
//   return <button className="sign-in" onClick={googleSignIn}>Sign In With Google</button>
// }

// const UserSignOut = () => {
//   const auth = firebase.auth()
//   return auth.currentUser && 
  
//   <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  
// }

// const MessageRoom = () => {
//   const dummy = useRef()
//   const firestore = firebase.firestore()
//   const messagesRef = firestore.collection('messages') //reads table 'messages' on firebase db
//   const query = messagesRef.orderBy('createdAt').limit(25) // limit displays # of messages ordered by date
//   const [messages] = useCollectionData(query, {idField: 'id'})
//   const [formValue, setFormValue] = useState('') // user input for sending messages
//   const auth = firebase.auth()
//   const sendMessage = async(e) => {
//     e.preventDefault()
//     const { uid } = auth.currentUser

//     await messagesRef.add({
//       text: formValue,
//       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//       uid
//     }) // creates a new document in firebase db by assigning formValue

//     setFormValue('')

//     dummy.current.scrollIntoView({behavior: 'smooth'})
//   }
//   console.log(auth.currentUser.displayName)
//   return <>
//   <main>

//     { messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />) } 

//     <span ref={dummy}></span>

//   </main>

//   <form onSubmit={sendMessage}>

//     <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type your message" />

//     <button type="submit" disabled={!formValue}>🐌</button>

//   </form>
// </>
// }

// const ChatMessage = (props) => {
//   const auth = firebase.auth()
//   const { text, uid, photoUrl } = props.message

//   const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received' // user ids that match msgs user id are marked as "sent" all other ids are considered received.

//   return <>
//   <div className={ `message ${messageClass}` }>
//     <img alt='' src={ photoUrl } />
//     <p>{text}</p>
//   </div>
// </>
// }