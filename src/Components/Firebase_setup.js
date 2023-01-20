// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9lJo-qhXeFTBcL9Os7_xr8j3YEtoNXts",
  authDomain: "taskmanager-a4525.firebaseapp.com",
  projectId: "taskmanager-a4525",
  storageBucket: "taskmanager-a4525.appspot.com",
  messagingSenderId: "914199765322",
  appId: "1:914199765322:web:3ca98b00740c9fbd1be1b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth=getAuth(app);