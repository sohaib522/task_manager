// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { Keys } from "../../Firebase_Api_Keys";

const firebaseConfig = {
  apiKey: Keys.apiKey,
  authDomain: Keys.authDomain,
  projectId: Keys.projectId,
  storageBucket: Keys.storageBucket,
  messagingSenderId: Keys.messagingSenderId,
  appId: Keys.appId
};

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth=getAuth(app);