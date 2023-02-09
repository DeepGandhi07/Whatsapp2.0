// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

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
const app = initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
