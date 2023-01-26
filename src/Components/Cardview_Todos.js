import React from 'react'
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@mui/material';
export default function Cardview_Todos (props) {
  return (
    <Card style={{width : '50%',}} align="center">
    <Card.Header as="h5">{props.To_do.Title}</Card.Header>
    <Card.Body>
      <Card.Text>Description : {props.To_do.Description}
      </Card.Text>
      <Card.Text>Completion Date and Time : {props.To_do.Datetime}
      </Card.Text>

      <Card.Text>Status : {props.To_do.status}</Card.Text>
      <div style={{display : "flex",align:"center",margin :'10px'}}>
      <Button variant="text">Mark it Completed</Button>
      <Button variant="text" onClick={props.handle_delete(props.id)} >Delete</Button>
      </div>
    </Card.Body>
  </Card>
  )
}

