import React from 'react'
// import { Link } from 'react-router-dom'
import { Navbar, Nav} from 'react-bootstrap'

const Header = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">SomeStore</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="">Cart</Nav.Link>
                        <Nav.Link href="">Sign In</Nav.Link>
                    </Nav>
            </Navbar>
        </div>
    )
}
export default Header