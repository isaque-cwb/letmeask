import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAb15jrD70JFyb_utbLy_K48mJPURoZu58",
  authDomain: "letmeask002.firebaseapp.com",
  databaseURL: "https://letmeask002-default-rtdb.firebaseio.com",
  projectId: "letmeask002",
  storageBucket: "letmeask002.appspot.com",
  messagingSenderId: "35948762088",
  appId: "1:35948762088:web:a9240d4e340846bd414a5d"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }