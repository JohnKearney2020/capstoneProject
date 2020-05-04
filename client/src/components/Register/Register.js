import React, {useEffect, useState} from "react";
import { Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../actions/userActions'


function Register(props) {
    const [ name, setName]= useState('')
    const [ email, setEmail]= useState('')
    const [ password, setPassword]= useState('')
    const [ rePassword, setRePassword]= useState('')
    const userRegister = useSelector(state => state.userRegister)
    const {loading, userDetails, error} = userRegister;
    const dispatch = useDispatch();

    useEffect(() => {
    if(userDetails){
        props.history.push('/')
    }


    return () => {
      //
    }
    }, [userDetails]);


    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(register(name, email, password))
    }


    return (
        <Form onSubmit={submitHandler}>
            <h2>REGISTER</h2>
            <li>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
            </li>
            <Form.Group controlId="formBasicName">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control type="name" placeholder="Enter your name" name="name" id='name' onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label htmlFor="email">Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" id='email' onChange={(e) => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label htmlFor="rePassword">Re-Enter Password</Form.Label>
                <Form.Control type="password" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)} />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Register
            </Button>
            <Form.Group >
                <Form.Text>Already have an account? <Link to="/signin">Click here to Sign In</Link>  </Form.Text>
            </Form.Group>
        </Form>
        
    );
}
export default Register;