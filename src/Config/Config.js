import * as firebase from 'firebase'

import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB0v0QwMMxApryHmAwpd3MhRN0ciTaM1BE",
    authDomain: "diplom-b050c.firebaseapp.com",
    databaseURL: "https://diplom-b050c-default-rtdb.firebaseio.com",
    projectId: "diplom-b050c",
    storageBucket: "diplom-b050c.appspot.com",
    messagingSenderId: "581939099950",
    appId: "1:581939099950:web:e011d11a4e2cf70119a2bf",
    measurementId: "G-3R7EJ3WP9X"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage }