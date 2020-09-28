import firebase from 'firebase/app'; //firebase
import 'firebase/database'; //firebase database

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBD0Vejc_IgwUr9I4YWdZGjkYwcz2OvsLU",
    authDomain: "phonebook-2785b.firebaseapp.com",
    databaseURL: "https://phonebook-2785b.firebaseio.com",
    projectId: "phonebook-2785b",
    storageBucket: "phonebook-2785b.appspot.com",
    messagingSenderId: "519476128752",
    appId: "1:519476128752:web:ac171a3a781bb6342f0b35"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;