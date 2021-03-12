import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

 var firebaseConfig = {
    apiKey: "AIzaSyAvrIb2aMGVYG5KtxlpDAKe3SeqdqS44VE",
    authDomain: "chatapp-77478.firebaseapp.com",
    databaseURL: "https://chatapp-77478.firebaseio.com",
    projectId: "chatapp-77478",
    storageBucket: "chatapp-77478.appspot.com",
    messagingSenderId: "682788177584",
    appId: "1:682788177584:web:af9a71cbf17b629edd1d75",
    measurementId: "G-YXV4D8NQG9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebaseConfig;