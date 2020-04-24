const HttpError = require('../models/httpError');
// const uuid = require('uuid/v4');
// import { v4 as uuidv4 } from 'uuid';
// import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

let DUMMY_USERS = [
    {
        id: 'u1',
        firstName: 'John',
        lastName: 'Kearney',
        dob: '12/27/1984',
        email: 'jk242903@gmail.com',
        password: 'testPass123'
    }
];

//===========================================================
//                  Get a User by ID
//===========================================================
const getUserById = (req,res,next) => {
    const userId = req.params.uid; // ':uid' in our route
    const user = DUMMY_USERS.find((eachUser) => {
        return eachUser.id === userId;
    })

    // Error handling
    if (!user) { //if we don't find a matching user
    // HttpError is a class we created for error handling in our models folder and imported into this file above
        return next(
            new HttpError('Could not find a user for the provided user id.', 404)
        );
    }

    // console.log('GET request in Places');
    res.json({user: user}); // {user} would work too, since the key and value are the same
}

//===========================================================
//                  Get a User by Email
//===========================================================
const getUserByEmail = (req,res,next) => {
    const userEmail = req.params.uemail; // ':uemail' in our route
    const user = DUMMY_USERS.find((eachUser) => {
        return eachUser.email === userEmail;
    })

    // Error handling
    if (!user) { //if we don't find a matching user
    // HttpError is a class we created for error handling in our models folder and imported into this file above
        return next(
            new HttpError('Could not find a user for the provided email address', 404)
        );
    }
    
    // console.log('GET request in Places');
    res.json({user: user}); // {user} would work too, since the key and value are the same
}

//===========================================================
//                  Create a User / Signup
//===========================================================
const userSignUp = (req,res,next) => {
// remember, GET requests do not have a body, but POST requests do
// we will use object destructuring to store data pulled from the object as constants
    const { firstName, lastName, dob, email, password } = req.body;
    // validate user input
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }

    // See if a user has already claimed that email
    const emailAlreadyTaken = DUMMY_USERS.find(eachUser => eachUser.email === email);
    if(emailAlreadyTaken){
        throw new HttpError('Could not create user, email already taken.', 422); //422 typically used for invalid user input
    }
    const createdUser = {
        //remember, instead of { title: title }, we can just do { title } since the key value are both the same
        id: uuidv4(), //generates a unique id
        firstName, 
        lastName, 
        dob, 
        email,
        password
    }
    // add the createdUser object to our existing array of user objects, DUMMY_USERS
    DUMMY_USERS.push(createdUser);
    res.status(201).json({user: createdUser});
    
}

//===========================================================
//                  Delete a User by ID
//===========================================================
const deleteUser = (req,res,next) => {
    const userId = req.params.uid;
    // Validate that the Id passed to the route actually exists
    if(!DUMMY_USERS.find(eachUser => eachUser.id === userId)){
        throw new HttpError('Could not find a place with that id.', 404);
    }    
    DUMMY_USERS = DUMMY_USERS.filter(eachUser => eachUser.id !== userId);
    res.status(200).json({message: 'Deleted user.'});
}

//===========================================================
//                  Update a User's Info
//===========================================================
const updateUser = (req,res,next) => {
    const { firstName, lastName, dob, email, password } = req.body;
    // validate user input
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
    const userId = req.params.uid;
    // Update the Object IMMUTABLY
    const updatedUser = { ...DUMMY_USERS.find(eachUser => eachUser.id === userId)};
    const userIndex = DUMMY_USERS.findIndex(eachUser => eachUser.id === userId);
    // Update the old values with new values
    updatedUser.firstName = firstName;
    updatedUser.lastName = lastName;
    updatedUser.dob = dob;
    updatedUser.email = email;
    updatedUser.password = password;
    // replace the old place object with the new one
    DUMMY_USERS[userIndex] = updatedUser;

    res.status(200).json({user: updatedUser}); // 200 since nothing new was created
}

//===========================================================
//                  Get all Users
//===========================================================
const getAllUsers = (req,res,next) => {
    // Error handling
    if (!DUMMY_USERS || DUMMY_USERS.length === 0) { //if we don't find any users
        // HttpError is a class we created for error handling in our models folder and imported into this file above
        return next(
            new HttpError('Could not find any users.', 404)
        );
    }

    console.log('GET request in Users');
    res.json({users: DUMMY_USERS}); // {place} would work too, since the key and value are the same    
}

//===========================================================
//                  User Login
//===========================================================
const userLogin = (req,res,next) => {
    const { email, password } = req.body;
    const identifiedUser = DUMMY_USERS.find(eachUser => eachUser.email === email);
    // Error Handling
    if (!identifiedUser || identifiedUser.password !== password){
        throw new HttpError('Could not identify user, credentials seem to be wrong.', 401); //401 code is authentication failure
    }
    res.json({message: "Logged in."})
}


exports.getUserById = getUserById;
exports.getUserByEmail = getUserByEmail;
exports.userSignUp = userSignUp;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.getAllUsers = getAllUsers;
exports.userLogin = userLogin;
