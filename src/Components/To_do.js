import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { auth } from './Firebase_setup';
import { database } from './Firebase_setup';
import {  ref, set } from "firebase/database";
import {v4 as uuid} from 'uuid'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {Grid} from '@mui/material';
export default function To_do(props) {
  const [Date_time,setDate_time]=useState('2022-12-18T21:11:54')
    const [Task,setTask]=useState({
        title : '',
        description : '',
        status : 'incomplete', 
        creation_date : new Date()
        

    })
   
    const user=props.current_user
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

    const handlesubmit=(e)=>{
        e.preventDefault();
        var unique_id=uuid();
        var small_id=unique_id.slice(0,8)
        Task["id"]=small_id
        Task["Date_time"]=Date_time
        setTask(Task)
        set(ref(database, 'Todos/'+user+'/'+small_id), {
        Title : Task.title  ,
        Description : Task.description, 
        id : Task.id ,
        status : Task.status,
        Datetime : Task.Date_time    });
        console.log ("The new values are : ")
    }
    const handlechange=(event)=>
    {      var unique_id=uuid();
      var small_id=unique_id.slice(0,8)
        let name ,value,temp;
      name=event.target.name
      value=event.target.value
           setTask({...Task,[name] : value})
     
    }
    const handledate=(date)=>{
     
     setDate_time(date)

    }
  return (
    <div>
      
        <Button onClick={handleOpen}>Add task</Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Grid container display="column" spacing={14} >
<form onSubmit={handlesubmit}>
  <Box sx={style}>
      <Grid item>
      <TextField  id="title" name="title" label="Title" variant="outlined"  onChange={handlechange}   />
      </Grid>
      <Grid item>
      <TextField
          id="description"
          name="description"
          label="Description"
          multiline
          maxRows={4}
          onChange={handlechange}
        />
      </Grid>
      <Grid item>
        
      <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DateTimePicker
          label="Date&Time picker"
          name="date_time"
          value={Date_time}
          onChange={handledate}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
      </Grid>
      <Grid item><Button type="submit" onClick={handlesubmit}>Add task</Button></Grid>
    
  
  
   
  </Box>
</form>
</Grid>     
</Modal>
    </div>
  )
}
