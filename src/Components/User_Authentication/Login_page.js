import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from 'react'
import {  signInWithEmailAndPassword } from "firebase/auth";
import Box from '@mui/material/Box';
import { Grid, Modal, TextField } from "@mui/material";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import Create_Account from "./Create_Account";
import { useNavigate} from "react-router-dom";
import { auth } from "../Firebase_Api/Firebase_setup";
import { signOut } from "firebase/auth";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useFormik } from "formik";
import { Sign_in_schema } from "./Schemas";
import CircularProgress from '@mui/material/CircularProgress';


export default function Email_Auth() {
  const [open, setOpen] = React.useState(false);
  const [errorMessage,SeterrorMessage]=useState('')
  const [progressbar,Setprogressbar]=useState(true)

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})
  const navigate=useNavigate();
  const initialValues=
    {
        password : " ",
        email : " "
    }
    const Signin=(email,password)=>{
      Setprogressbar(true)
      signInWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
    const user = userCredential.user;
    Setprogressbar(false)
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
    
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
        Setprogressbar(false)
        navigate("/user",{state :{current_user : user.uid}})
    }
  else {
    Setprogressbar(false)
  }})
    },[])
  
    

const handleClose = (event, reason) => {
  if (reason === "clickaway") {
    return
  }

  setOpen(false)
}



const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
  useFormik({
    initialValues,
    validationSchema: Sign_in_schema,
    validateOnChange: true,
    validateOnBlur: false,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
     // console.log("🚀 ~ file: App.jsx ~ line 17 ~ App ~ values", values);
      Signin(values.email,values.password)
      //// to get rid of all the values after submitting the form
      action.resetForm();
    },
  });

console.log(errors);
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
       <Grid item>
      {progressbar?
      <Box sx={{ display: 'flex',justifyContent : 'center',height : '10vh'}}>
      <CircularProgress sx={{width : '50%'}}/>
    </Box>
: ""}
      </Grid>
        <Grid item >
        <Typography variant="h5" gutterBottom>
        Please Sign into your Account
      </Typography>
        </Grid>
        <Grid item >
      <TextField sx={{width : "3"}} onChange={handleChange}  value={values.email} type="email" id="email" label="Email" variant="outlined" name="email" />
      {touched.email && errors.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}
      </Grid>
      <Grid item>
      <TextField onChange={handleChange}  value={values.password} type="password" id="password" label="Password" variant="outlined" name="password" />
      {touched.password && errors.password ? (
                      <p className="form-error">{errors.password}</p>
                    ) : null}
      </Grid>
     

        <Grid item >
        <Button type="submit" variant="contained">Sign in</Button>
        </Grid>
        <Grid item >
        <Create_Account/>
    
      </Grid>
      </Grid>
</form>
    
  
    </div>
   
  )
}

