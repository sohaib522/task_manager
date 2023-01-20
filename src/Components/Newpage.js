import React from 'react'
import { useLocation } from 'react-router-dom'
import { auth } from './Firebase_setup';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
export default function Newpage () {
  const navigate=useNavigate()
  const logout=()=>{
    signOut(auth).then(() => {
      navigate("/")// Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

  }


  const location=useLocation();
  return (
    <div>
      <h1>{location.state.current_user}</h1>
      <button onClick={logout}>Sign out</button>
      

    </div>
  )
}
