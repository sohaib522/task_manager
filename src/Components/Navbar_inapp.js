import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar_inapp(props) {
 
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">TaskManager</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link >Tasks</Nav.Link>
        <Nav.Link href="#features">Analysis</Nav.Link>
        <Nav.Link onClick={props.signout}>Sign out</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  )
}

