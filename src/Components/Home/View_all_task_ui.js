import React from 'react'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Grid } from '@mui/material';
import { useCallback  } from 'react';
import { handle_delete } from './Home';
import {Typography} from '@mui/material';
import {  ref, set,onValue,child,get, update, remove } from "firebase/database";
export default function Cardview_Todos (props) {
   
  return (
    <div className="d-flex justify-content-center">
    <Card style={{ width: '50rem' }} className="max-auto" >
    
    <Card.Header as="h5">{props.To_do.Title}</Card.Header>
    <Card.Body>
    <Typography variant="subtitle1" gutterBottom>
        Creation Date {props.To_do.Creationdate}
      </Typography>
      <Card.Text>Description  {props.To_do.Description}
      </Card.Text>
      <Card.Text>Completion Date and Time  {props.To_do.Completiondate}
      </Card.Text>

      <Card.Text>Status  {props.To_do.status}</Card.Text>
      <div className="d-flex justify-content-center">
      <Button variant="text" onClick={()=>props.Mark_complete(props.To_do.id)} >Mark it Completed</Button>
      <Button variant="text" onClick={()=>handle_delete(props.To_do.id,props.userid)} >Delete</Button>
      </div> 
    </Card.Body>
  </Card>
  <br/>
  <br/>
  </div>
 
    
  )
}

