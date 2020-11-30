// Core Firebase SDK:
import firebase from 'firebase/app';

// Realtime database library.
import 'firebase/database';

// Initialize firebase.
    // Use YOUR app's firebase config object.
const firebaseConfig = {
    apiKey: "AIzaSyB0bv3ao0yC21mqWcHvmbgQHlmHCxCzm_Y",
    authDomain: "project5fbreact.firebaseapp.com",
    databaseURL: "https://project5fbreact.firebaseio.com",
    projectId: "project5fbreact",
    storageBucket: "project5fbreact.appspot.com",
    messagingSenderId: "125314626288",
    appId: "1:125314626288:web:afb469a88e51d50ce10835"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;