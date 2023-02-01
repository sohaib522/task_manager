import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { auth } from '../Firebase_Api/Firebase_setup';
import { database } from '../Firebase_Api/Firebase_setup';
import {  ref, set } from "firebase/database";
import {v4 as uuid} from 'uuid'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {Grid} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useFormik } from "formik";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { To_do_Schema } from '../User_Authentication/Schemas';
export default function To_do(props) {
  const current_date=new Date()
  const [date,setDate]=useState(current_date.toDateString())
  const [show, setshow] = React.useState(false);
  const [errorMessage,SeterrorMessage]=useState('')
  const [error_state,SetErrorState]=useState(null)
 
    const initialValues={
        Title : '',
        Description : '',
        Status : 'Incomplete', 
        Creationdate : current_date.toDateString()
        

    }
    const user=props.current_user
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const style = {
        margin : "30",
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
    

  
 
    const handleClosed = (event, reason) => {
      if (reason === "clickaway") {
        return
      }
    
      setshow(false)
    }
    const handledate=(date)=>{
     
     setDate(date)

    }
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    })
    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
  useFormik({
    initialValues,
    validationSchema: To_do_Schema,
    validateOnChange: true,
    validateOnBlur: false,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
     // console.log("🚀 ~ file: App.jsx ~ line 17 ~ App ~ values", values);
      //Signin(values.email,values.password)
      //// to get rid of all the values after submitting the form
      values["Completiondate"]=date.toString();
      props.Add_todo_in_database(values)
      //action.resetForm();
    },
  });

//console.log(errors);
  return (
    <div>
       


      
        <Button onClick={handleOpen}>Add task</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  
<form onSubmit={handleSubmit}>
  <Box sx={style}>
  <Grid container display="flex" direction="column" align="center" spacing={4}>
    <Grid item>
    <Typography variant="h5" gutterBottom>
        Add a Task
      </Typography>
    </Grid>
    <Grid item>
    <TextField  id="Title" value={values.Title} name="Title" label="Title" variant="outlined"  onChange={handleChange}/>
    {touched.title && errors.title ? (
                      <p className="form-error">{errors.title}</p>
                    ) : null}
    </Grid>
    <Grid item>
    <TextField
          id="Description"
          name="Description"
          value={values.Description}
          label="Description"
          multiline
          maxRows={4}
          onChange={handleChange}
        />
         {touched.description && errors.description ? (
                      <p className="form-error">{errors.Description}</p>
                    ) : null}
    </Grid>
    <Grid item>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DesktopDatePicker
          label="Select Date"
          inputFormat="YYYY/MM/DD"
          value={date}
          onChange={handledate}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
    </Grid>
      <Grid item>
      <Button type="submit" >Add task</Button>
      </Grid>
      </Grid>
  </Box>
</form>    
</Modal>

    </div>
  )
}
