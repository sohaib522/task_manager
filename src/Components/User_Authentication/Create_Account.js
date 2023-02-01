import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid,  TextField } from "@mui/material";
import {  ref, set } from "firebase/database";
import { database } from '../Firebase_Api/Firebase_setup';
import { auth } from '../Firebase_Api/Firebase_setup';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useFormik } from "formik";
import { Sign_in_schema } from "./Schemas";
import CircularProgress from '@mui/material/CircularProgress';


export default function Create_Account() {
  const [progressbar,setProgressbar]=useState(false)
  const [show, setshow] = React.useState(false);
  const [errorMessage,SeterrorMessage]=useState('')
  const navigate=useNavigate();
  const initialValues=
    {
        password : "",
        email : "",
        username : ""
    }
    console.log(".........."+initialValues.password)
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [user_id,setuserid]=useState('')

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })
   const  Signup=(email,password)=> {
    setProgressbar(true)

      createUserWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      set(ref(database, "Users"+"/"+user.uid), {
        Name : values.username

      }).then(() => {
      console("data wrote sucessfully")  // Data saved successfully!
      })
      .catch((error) => {
       console.log(error)
       SeterrorMessage(error.message)
       setshow(true); 
       // The write failed...
      });
      setProgressbar(false);
      navigate("/user",{state:{current_user : user}})
     


      // ...
    })
    .catch((error) => {
      setProgressbar(false)
      const errorCode = error.code;
      const errorMessage = error.message;
      SeterrorMessage(error.message)
      setshow(true);
      // ..
    });
    
  }

const handleClosed = (event, reason) => {
  if (reason === "clickaway") {
    SeterrorMessage('')
    return
  }

  setshow(false)
}


const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
useFormik({
  initialValues,
  validationSchema: Sign_in_schema,
  validateOnChange: true,
  validateOnBlur: false,
  //// By disabling validation onChange and onBlur formik will validate on submit.
  onSubmit: (values, action) => {
    console.log("🚀 ~ file: App.jsx ~ line 17 ~ App ~ values", values);
    //// to get rid of all the values after submitting the form
   ;
   Signup(values.email,values.password)
   
    action.resetForm();
  },
});
  return (
    <div>
       <Snackbar open={open} autoHideDuration={10} onClose={handleClosed}>
       <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
     
        <Button variant="contained" onClick={handleOpen}>Create New Account</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
       <br/>
       <form  onSubmit={handleSubmit}>
       <Grid container display="flex" direction="column" align="center" spacing={6}>
        <Grid item >
        <Typography variant="h5" gutterBottom>
        Please Create New Account
      </Typography>
        </Grid>
        <Grid item >
      <TextField name='email' onChange={handleChange}  value={values.email} type="email" id="email" label="Email" variant="outlined" />
      {touched.email && errors.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}
      </Grid>
      <Grid item >
      <TextField name='username' onChange={handleChange}  value={values.username} type="text" id="username" label="username" variant="outlined" />
      {touched.username && errors.username ? (
                      <p className="form-error">{errors.username}</p>
                    ) : null}
      </Grid>
      <Grid item>
      <TextField name='password' onChange={handleChange}  value={values.password} type="password" id="password" label="Password" variant="outlined" />
      {touched.password && errors.password ? (
                      <p className="form-error">{errors.password}</p>
                    ) : null}
      </Grid>
      <Grid item>
      {progressbar?
      <Box sx={{ display: 'flex',justifyContent : 'center',height : '10vh'}}>
      <CircularProgress sx={{width : '50%'}}/>
    </Box>
: ""}

      </Grid>
    

        <Grid item >
        <Button type='submit' variant="contained">Create Account</Button>
        </Grid>
       
      </Grid>

      </form>
      
  </Box>
</Modal>
    </div>
  )
}
