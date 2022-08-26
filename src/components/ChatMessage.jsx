import React from 'react'
import firebase from 'firebase/compat/app';
import { userPfpInitial } from './ProfilePhotoFunction'

export const ChatMessage = (props) => {
    const auth = firebase.auth()
    const { text, uid, photoURL, displayName } = props.message
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received' // user ids that match msgs user id are marked as "sent" all other ids are considered received.
    
    return <>
    <div className={ `message ${messageClass}` }>
      {/* {photoUrl ? <img alt='' src={ photoUrl }/> : userPfpInitial() } */}
      <img alt='' src={ photoURL || `https://ui-avatars.com/api/?name=${userPfpInitial(displayName)}` }/>
      <p>{text}</p>
    </div>
  </>
  }