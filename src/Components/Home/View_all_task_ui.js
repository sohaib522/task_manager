import React from 'react'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Grid } from '@mui/material';
import { useCallback  } from 'react';
import {Typography} from '@mui/material';
import {  ref, set,onValue,child,get, update, remove } from "firebase/database";
export default function Cardview_Todos (props) {
   
  return (
    <div className="d-flex justify-content-center mx-3 my-3">
      <br/>
    <Card style={{ width: '50rem' }} className="max-auto" >
    
    <Card.Header as="h5">{props.To_do.Title}</Card.Header>
    <Card.Body>
    <Typography variant="subtitle1" gutterBottom>
        Creation Date&nbsp;&nbsp;{props.To_do.Creationdate}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Description&nbsp;&nbsp;{props.To_do.Description}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Completiondate&nbsp;&nbsp;{props.To_do.Completiondate}
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Status&nbsp;&nbsp;{props.To_do.Status}
      </Typography>
      <div className="d-flex justify-content-center">
      <Button variant="text" onClick={()=>props.Mark_complete(props.To_do.id)} >Mark it Completed</Button>
      <Button variant="text" onClick={()=>props.handle_delete(props.To_do.id)} >Delete</Button>
      </div> 
    </Card.Body>
  </Card>
  </div>
 
    
  )
}

