// import firebase from 'firebase/compat/app';

// export const userPfpInitial = () => {
//     const auth = firebase.auth()
//     fullname = auth.currentUser.displayName 
//     return fullname.replace(' ','+')
// }


export const userPfpInitial = (a) => {
    // if(!a){
    //     return ''
    // }
    // return a.replace(' ','+')

    return a ? a.replace(' ','+') : ''
}
