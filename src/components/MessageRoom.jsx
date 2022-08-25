import React, { useState, useRef } from 'react'
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { ChatMessage } from './ChatMessage'

export const MessageRoom = () => {
    const dummy = useRef()
    const firestore = firebase.firestore()
    const messagesRef = firestore.collection('messages') //reads table 'messages' on firebase db
    const query = messagesRef.orderBy('createdAt').limit(25) // limit displays # of messages ordered by date
    const [messages] = useCollectionData(query, {idField: 'id'})
    const [formValue, setFormValue] = useState('') // user input for sending messages
    const auth = firebase.auth()
    const sendMessage = async(e) => {
      e.preventDefault()
      const { uid } = auth.currentUser
  
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid
      }) // creates a new document in firebase db by assigning formValue
  
      setFormValue('')
  
      dummy.current.scrollIntoView({behavior: 'smooth'})
    }
    
    return <>
    <main>
  
      { messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />) } 
  
      <span ref={dummy}></span>
  
    </main>
  
    <form onSubmit={sendMessage}>
  
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type your message" />
  
      <button type="submit" disabled={!formValue}>🐌</button>
  
    </form>
  </>
  }