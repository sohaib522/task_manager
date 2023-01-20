import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from 'react'
import {  signInWithEmailAndPassword } from "firebase/auth";
import Box from '@mui/material/Box';
import { Grid, Modal, TextField } from "@mui/material";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import Create_Account from "./Create_Account";
import { useNavigate} from "react-router-dom";
import { auth } from "./Firebase_setup";
import { signOut } from "firebase/auth";


export default function Email_Auth() {
  const navigate=useNavigate();
  const [values,setvalues]=useState(
    {
        password : " ",
        email : " "
    })
 
    const handlechange=(event)=>{
      let name ,value;
      name=event.target.name
      value=event.target.value
      setvalues({...values,[name] : value})
       
    }
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
        navigate("/user",{state :{current_user : user.uid}})
    }})
    },[])
   /* signInWithEmailAndPassword(auth,"sumbulqureshi@gmail.com","sohaib")
  .then((userCredential) => {
    
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  */
  
    
    const handleSubmit=(event)=>
{
 event.preventDefault();
signInWithEmailAndPassword(auth,values.email,values.password)
  .then((userCredential) => {
  const user = userCredential.user;
  navigate("/user",{state:{current_user : user}})
    
    // ...
  })


}

const logout=()=>{
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });

}
   /* const auth = getAuth();
signInWithEmailAndPassword(auth,"sohaib429@gmail.com", "sohaiblucky777")
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  })
*/
/*createUserWithEmailAndPassword(auth, "Ahmadnadeem1234@gmail.com", '123456')
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate("/user",{state : {current_user : user.uid}})
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
   */

  return (
    <div>
       <br/>
       <br/>
       <br/>

       <br/>
       <br/>
       <br/>
       <form onSubmit={handleSubmit} >
       <Grid container display="flex" direction="column" align="center" spacing={8}>
        <Grid item >
        <Typography variant="h5" gutterBottom>
        Please Sign into your Account
      </Typography>
        </Grid>
        <Grid item >
      <TextField onChange={handlechange} value={values.email} type="email" id="email" label="Email" variant="outlined" name="email" />
      </Grid>
      <Grid item>
      <TextField onChange={handlechange} value={values.password} type="password" id="password" label="Password" variant="outlined" name="password" />
      </Grid>

        <Grid item >
        <Button type="submit" variant="contained">Sign in</Button>
        </Grid>
        <Grid item >
        <Create_Account/>
    
      </Grid>
      </Grid>

      </form>
      <button onClick={logout}>signout</button>
    </div>
   
  )
}

