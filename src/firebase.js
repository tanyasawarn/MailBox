import firebase from "firebase/compat/app";
import "firebase/compat/firestore"; // to import firebase module
import "firebase/compat/auth"; //   to import the auth module
import 'firebase/firestore';
import "firebase/compat/database"; 




const firebaseConfig = {
    apiKey: "AIzaSyB6tE1V5ZYkvxh1WJYS6xfBz3ayy9I0V24",
    authDomain: "redux-a1b82.firebaseapp.com",
    databaseURL: "https://redux-a1b82-default-rtdb.firebaseio.com",
    projectId: "redux-a1b82",
    storageBucket: "redux-a1b82.appspot.com",
    messagingSenderId: "904852429878",
    appId: "1:904852429878:web:46fca09da50d68a5344c97"
  };

  const FirebaseApp = firebase.initializeApp(firebaseConfig);

  const db = FirebaseApp.firestore();

  const auth = FirebaseApp.auth();

  const database = firebase.database();





  export { db, auth, database }