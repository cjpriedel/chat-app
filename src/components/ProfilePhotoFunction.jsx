import firebase from 'firebase/compat/app';

export const userPfpInitial = () => {
    const auth = firebase.auth()
    let fullname = auth.currentUser.displayName 
    let firstInitial = fullname.split('')
    return firstInitial[0]
  }