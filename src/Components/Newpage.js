import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { auth } from './Firebase_setup';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Select } from '@mui/material';
import To_do from './To_do';
import { database } from './Firebase_setup';
import Tooltip from '@mui/material/Tooltip';
import  Navbar_inapp from './Navbar_inapp';
import  Cardview_Todos  from './Cardview_Todos';



import {  ref, set,onValue,child,get, update, remove } from "firebase/database";
import { Navbar } from 'react-bootstrap';
export const handle_delete=(id,userid)=>{
  console.log(id+"    "+userid)
  const dbRef = ref(database);
  
remove(ref(database, 'Todos/'+userid+"/"+id)).then(() => {
    console.log("deleted")
    window.location.reload();
})
.catch((error) => {
  
  console.log (error) // The write failed...
});
  
  
    }

export default function Newpage () {
  const [count,SetCount]=useState(0)
  const [username,Setusername]=useState('')
  const [to_dos,setto_dos]=useState([])
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
  const user_name = ref(database, 'Users/' + userid);
  onValue(user_name, (snapshot) => {
    const data = snapshot.val();

    Setusername(data.Name)   
  })
},[])


  useEffect(()=>{
    
    const dbRef = ref(database);
    get(child(dbRef, `Todos/${userid}/`)).then((snapshot) => {
      if (snapshot.exists()) {
        let temp=[]
        snapshot.forEach(function(child){
          var childkey=child.key;
          var childdata=child.val();
          temp.push(childdata)
        })
      
        setto_dos(temp)
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  },[])
  const Mark_complete=(id)=>
  { console.log(id)
    update(ref(database, 'Todos/'+userid+'/'+id), {
     
      status : "Completed"
      
       }).then(() => {
          window.location.reload();
        // Data saved successfully!
      })
      .catch((error) => {
        
        console.log (error) // The write failed...
      });
     
  }

  
  const component=to_dos.map((c,i)=> <Cardview_Todos key={i} To_do={c} userid={userid}   handle_delete={handle_delete} Mark_complete={Mark_complete} />)

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
