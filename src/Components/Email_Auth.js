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
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


export default function Email_Auth() {
  const [open, setOpen] = React.useState(false);
  const [errorMessage,SeterrorMessage]=useState('')

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})
  const navigate=useNavigate();
  const [values,setvalues]=useState(
    {
        password : " ",
        email : " "
    })
    const handleClick = () => {
     
    };
 
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
  
    
    const handleSubmit=(event)=>
{
 event.preventDefault();
signInWithEmailAndPassword(auth,values.email,values.password)
  .then((userCredential) => {
  const user = userCredential.user;
  navigate("/user",{state:{current_user : user}})
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    SeterrorMessage(error.message)
    setOpen(true);

  });


}
const handleClose = (event, reason) => {
  if (reason === "clickaway") {
    return
  }

  setOpen(false)
}

const logout=()=>{
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });

}
  

  return (
    <div>
       <br/>
       <br/>
       <br/>

       <br/>
       <br/>
       <br/>
       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
       <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
       <form onSubmit={handleSubmit} >
       <Grid container display="flex" direction="column" align="center" spacing={8}>
        <Grid item >
        <Typography variant="h5" gutterBottom>
        Please Sign into your Account
      </Typography>
        </Grid>
        <Grid item >
      <TextField sx={{width : "300000"}} onChange={handlechange} value={values.email} type="email" id="email" label="Email" variant="outlined" name="email" />
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

