import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import {Button,Form,FormControl,Nav} from 'react-bootstrap'
import './BaseLayout.css'

const Header = (props) => {
  return (
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">ECommerce Shopping</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      
        <Nav.Link href="#home"className="fa fa-home">Home</Nav.Link>
        <Nav.Link href="#link"className="fa fa-gift">Wishlist</Nav.Link>
        <Nav.Link href="#link"className="fa fa-shopping-cart">Cart</Nav.Link>
        {/* <NavDropdown title="Products" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Find Products" className="mr-sm-2" />
        <Button variant="outline-mute" className="fa fa-search"></Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default Header
