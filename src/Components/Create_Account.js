import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid,  TextField } from "@mui/material";
import { auth } from './Firebase_setup';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Create_Account() {
  const [show, setshow] = React.useState(false);
  const [errorMessage,SeterrorMessage]=useState('')
  const navigate=useNavigate();
  const [values,setvalues]=useState(
    {
        password : " ",
        email : " "
    })
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      SeterrorMessage(error.message)
      setshow(true);
      // ..
    });
  }

const handlechange=(event)=>{
  let name ,value;
  name=event.target.name
  value=event.target.value
  setvalues({...values,[name] : value})
   
}
const handleClosed = (event, reason) => {
  if (reason === "clickaway") {
    return
  }

  setshow(false)
}


const handleSubmit=(event)=>
{
  event.preventDefault();
 Signup(values.email,values.password)

}
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClosed}>
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
       <br/>
       <br/>

       <br/>
       <br/>
       <br/>
       <form  onSubmit={handleSubmit}>
       <Grid container display="flex" direction="column" align="center" spacing={8}>
        <Grid item >
        <Typography variant="h5" gutterBottom>
        Please Create New Account
      </Typography>
        </Grid>
        <Grid item >
      <TextField name='email' onChange={handlechange} value={values.email} type="email" id="email" label="Email" variant="outlined" />
      </Grid>
      <Grid item>
      <TextField name='password' onChange={handlechange} value={values.password} type="password" id="password" label="Password" variant="outlined" />
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
