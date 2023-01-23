// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqE6G9B1uB2VEKigzm-qCa0yRJbIpOIRI",
  authDomain: "taskmanager-15412.firebaseapp.com",
  projectId: "taskmanager-15412",
  storageBucket: "taskmanager-15412.appspot.com",
  messagingSenderId: "678793308816",
  appId: "1:678793308816:web:f83c4a89325c1b73b90615"
};

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth=getAuth(app);