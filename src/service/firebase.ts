import firebase from 'firebase';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDQhSrJ5LauiNOqfgMvOjd3VYdSWKyBMqU",
  authDomain: "letmeask-81e7a.firebaseapp.com",
  databaseURL: "https://letmeask-81e7a-default-rtdb.firebaseio.com",
  projectId: "letmeask-81e7a",
  storageBucket: "letmeask-81e7a.appspot.com",
  messagingSenderId: "1063143638649",
  appId: "1:1063143638649:web:44b15bdfb24f1947ea76a8"
};

firebase.initializeApp(firebaseConfig);
