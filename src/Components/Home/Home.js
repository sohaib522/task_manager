import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { auth } from '../Firebase_Api/Firebase_setup';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Select } from '@mui/material';
import Add_task from './Add_task';
import { database } from '../Firebase_Api/Firebase_setup';
import Tooltip from '@mui/material/Tooltip';
import  Navbar_inapp from './Navbar_inapp';
import  View_all_task_ui  from './View_all_task_ui';
import { useFormik } from "formik";
import { To_do_Schema } from '../User_Authentication/Schemas';
import {v4 as uuid} from 'uuid'
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import {Typography} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, width } from '@mui/system';


import {  ref, set,onValue,child,get, update, remove } from "firebase/database";
import { Navbar } from 'react-bootstrap';


export default function Home() { 
  const [progressbar ,setProgressbar]=useState(true)
  const [count,SetCount]=useState(0)
  const [username,Setusername]=useState('')
  const [reload,Setreload]=useState(true)
  const [to_dos,setto_dos]=useState([])
  const [errorAlert, seterror_Alert] = React.useState(false);
  const [SucessAlert, setSucessAlert] = React.useState(false);
  const [errorMessage,SeterrorMessage]=useState('')
  const [open, setOpen] = React.useState(false);
  const location=useLocation();
  const userid=location.state.current_user
  const navigate=useNavigate()
  
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  })



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
console.log(data)
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
        setProgressbar(false)
      
        setto_dos(temp)
      } else {
        setProgressbar(false)
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
          const temp=to_dos.map((item)=>{ if(item.id==id)
       {
        return {...item,Status : "Completed"}
       }
      return item})
        // Data saved successfully!
      setto_dos(temp)})

      .catch((error) => {
        
        console.log (error) // The write failed...
      });
     
  }
  const handle_delete=(id)=>{
    console.log(id+"    "+userid)
    const dbRef = ref(database);
    
  remove(ref(database, 'Todos/'+userid+"/"+id)).then(() => {
      console.log("deleted")
      let temp=to_dos.filter(item=>item.id !=id)
       setto_dos(temp)
  })
  .catch((error) => {
    
    console.log (error) // The write failed...
  });
    
    
      }
  const handleerrorAlert = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
  
    seterror_Alert(false)
  }
  const handlesucessAlert = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
  
    setSucessAlert(false)
  } 

  const Add_todo_in_database=(values)=>{
    //console.log(values.creation_date)
    var unique_id=uuid();
    var small_id=unique_id.slice(0,8)
    values["id"]=small_id
    console.log(values)
    set(ref(database, 'Todos/'+userid+'/'+small_id), {
    Creationdate : values.Creationdate,
    Title : values.Title  ,
    Description : values.Description, 
    id : values.id ,
    Status : values.Status,
    Completiondate : values.Completiondate
   

    
     }).then(() => {
      SeterrorMessage("Task Added")
      setSucessAlert(true);
      to_dos.push(values)
      setto_dos(to_dos)
      console.log(to_dos)
      // Data saved successfully!
    })
    .catch((error) => {
      SeterrorMessage(error.message)
      seterror_Alert(true);
      // The write failed...
    });
   

  }


  
  const component=to_dos.map((c,i)=> <View_all_task_ui key={i}  To_do={c} userid={userid}   handle_delete={handle_delete} Mark_complete={Mark_complete} />)

  return (

    <div> {errorAlert? 
      <Snackbar open={errorAlert} autoHideDuration={6000} onClose={handleerrorAlert}>
      <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
: ""}
     {SucessAlert?<Snackbar open={SucessAlert} autoHideDuration={6000} onClose={handlesucessAlert}>
      <Alert severity="success">{errorMessage}</Alert>
      </Snackbar> : " " }
      <Navbar_inapp signout={logout} username={username}/>
      <br/>
      <Typography variant="h4" gutterBottom>
        Welcome,   {username}
      </Typography>
      <Add_task current_user={userid} Add_todo_in_database={Add_todo_in_database}/>
      {progressbar?
      <Box sx={{ display: 'flex',justifyContent : 'center',height : '100vh'}}>
      <CircularProgress sx={{width : '50%'}}/>
    </Box>
: ""}
       <>{component}</>  

    </div>
  )
}
