import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { auth } from './Firebase_setup';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import To_do from './To_do';
import { database } from './Firebase_setup';
import Tooltip from '@mui/material/Tooltip';
import  Navbar_inapp from './Navbar_inapp';
import  Cardview_Todos  from './Cardview_Todos';



import {  ref, set,onValue,child,get, update } from "firebase/database";
import { Navbar } from 'react-bootstrap';

export default function Newpage () {
  const [username,Setusername]=useState('')
  const tempi=[10,20,30,40,50,60]
  const [to_dos,setto_dos]=useState([])
  const temp=[];
  const location=useLocation();
  const userid=location.state.current_user
  const navigate=useNavigate()
  const logout=()=>{
    signOut(auth).then(() => {
      navigate("/")// Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    

  }
 
useEffect(()=>{
  const starCountRef = ref(database, 'Users/' + userid);
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();

    Setusername(data.Name)
   
  
  });
},[])

  
  useEffect(()=>{
    
    const dbRef = ref(database);
    get(child(dbRef, `Todos/${userid}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach(function(child){
          var childkey=child.key;
          var childdata=child.val();
         // console.log(childdata)
          temp.push(childdata)
        })
        setto_dos(temp)
        console.log(temp)
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  },[])
  
  const component=to_dos.map((c,i)=> <Cardview_Todos key={i} Title={c.Title} Description={c.Description} 
  Datetime={c.Datetime} status={c.status} id={c.id} />)

  return (
    <div>
      <Navbar_inapp signout={logout} username={username}/>
      <h1>{userid}</h1>
      <button onClick={logout}>Sign out</button>
      <To_do current_user={userid}/>
       <>{component}</>  

    </div>
  )
}
