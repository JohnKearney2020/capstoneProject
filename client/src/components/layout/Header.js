import React from 'react'
// import { Link } from 'react-router-dom'
import { Navbar, Nav} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const Header = () => {
    const userSignIn = useSelector(state => state.userSignIn);
    const {userDetails} = userSignIn;
    
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">SomeStore</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/cart">Cart</Nav.Link>
                        {
                            userDetails ? <Nav.Link href='/profile'>{userDetails.name}</Nav.Link> :
                            <Nav.Link href='/signin'>Sign In</Nav.Link>
                        }

                    </Nav>
            </Navbar>
        </div>
    )
}
export default Header