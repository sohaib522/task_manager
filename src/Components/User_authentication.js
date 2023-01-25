import React, { useState } from 'react'
import { auth } from "./Firebase_setup";
import { signOut } from "firebase/auth";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate} from "react-router-dom";

export const Signin = (email,password) => {
  
  
  const navigate=useNavigate();
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
    const user = userCredential.user;
    navigate("/user",{state:{current_user : user}})
     
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
  
    });
}
export const  Signup=(email,password)=> {
  const navigate=useNavigate();
    createUserWithEmailAndPassword(auth,email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert(user)
    navigate("/user",{state:{current_user : user}})
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  
  
    // ..
  });
}

export const alert = () => {

    alert("hello world")
}




