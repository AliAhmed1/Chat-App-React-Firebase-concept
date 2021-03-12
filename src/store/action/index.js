import firebase from 'firebase/app';
import Firebase from '../../config/firebase'
// import history from '../../history'
import { useHistory } from "react-router-dom";





const facebook_login = (history) => {
    return (dispatch) => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // Thistory gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            let createUser = {
                name: user.displayName,
                email: user.email,
                profile: user.photoURL,
                uid: user.uid
            }

            firebase.database().ref('/').child(`user/${user.uid}`).set(createUser)
                .then(() => {
                    dispatch({ type: "SETUSER", payload: createUser })
                    alert("successfully logged in");
                    history.push(`/chat`);
                })
            console.log(createUser)
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            console.log(errorMessage)
        });
    }
}

const getUser = () => {
    return (dispatch) => {
        let theUsers = [];
        firebase.database().ref('/').child('user').on('child_added', (data) => {
            theUsers.push(data.val())
        })
        console.log("User", theUsers)
        dispatch({ type: "SETFIREBASEUSERS", payload: theUsers })
    }
}

export {
    facebook_login,
    getUser
}