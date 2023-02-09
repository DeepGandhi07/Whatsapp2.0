// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAAM_o-DH_BUjnXfzXT0idsS8NalJ7DKqM",
  authDomain: "whatsapp-72488.firebaseapp.com",
  projectId: "whatsapp-72488",
  storageBucket: "whatsapp-72488.appspot.com",
  messagingSenderId: "928894561372",
  appId: "1:928894561372:web:00e6cdc5cd6e251f420a99",
  measurementId: "G-873CNFJJN7",
};

// Initialize Firebase
// const app = !firebase.app.length
//   ? firebase.initializeApp(firebaseConfig)
//   : firebase.app();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
