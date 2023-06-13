// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD6a9nqxN5SWsDVRmdQlMRBUqt_tmi8LzM",
    authDomain: "siperpus-91ff0.firebaseapp.com",
    projectId: "siperpus-91ff0",
    storageBucket: "siperpus-91ff0.appspot.com",
    messagingSenderId: "767987581301",
    appId: "1:767987581301:web:27de98717956d69290533c",
    measurementId: "G-MWZB04VLD1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
