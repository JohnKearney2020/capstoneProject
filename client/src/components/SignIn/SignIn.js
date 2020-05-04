
import React, {useEffect, useState} from "react";
import { Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../../actions/userActions'


function SignIn(props) {
    const [ email, setEmail]= useState('')
    const [ password, setPassword]= useState('')
    const userSignIn = useSelector(state => state.userSignIn)
    const {loading, userDetails, error} = userSignIn;
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
        dispatch(signin(email,password))
    }


    return (
        <Form onSubmit={submitHandler}>
            <h2>Sign In</h2>
            <li>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
            </li>
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
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
            <Form.Group >
                <Form.Text>New To Out Site? <Link to="/register">Create a new account wiht us.</Link>  </Form.Text>
            </Form.Group>
        </Form>
        
    );
}
export default SignIn;