import React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom"
const AdminHeader = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">iPrint</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">

          
          <NavLink to="/admin/mesa" className="nav-link" activeClassName={"active"} exact></NavLink>
          <NavLink to="/admin/plato" className="nav-link" activeClassName={"active"} exact></NavLink>
          <NavLink to="/admin/producto" className="nav-link" activeClassName={"active"} exact></NavLink>
          <NavLink to="/admin/pedido" className="nav-link" activeClassName={"active"} exact></NavLink>

        </Nav>
        
      </Navbar.Collapse>
    </Navbar>
  )
}

export default AdminHeader
