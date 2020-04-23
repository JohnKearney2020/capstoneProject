const HttpError = require('../models/httpError');
// const uuid = require('uuid/v4');
// import { v4 as uuidv4 } from 'uuid';
// import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require('uuid');

let DUMMY_USERS = [
    {
        id: 'u1',
        firstName: 'John',
        lastName: 'Kearney',
        dob: '12/27/1984',
        email: 'jk242903@gmail.com'
    }
];

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

const createUser = (req,res,next) => {
// remember, GET requests do not have a body, but POST requests do
// we will use object destructuring to store data pulled from the object as constants
    const { id, firstName, lastName, dob, email } = req.body;
    // shortcut instead of doing:
    // const firstName = req.body.firstName;
    const createdUser = {
        //remember, instead of { title: title }, we can just do { title } since the key value are both the same
        id: uuidv4(), //generates a unique id
        firstName, 
        lastName, 
        dob, 
        email
    }
    // add the createdUser object to our existing array of user objects, DUMMY_USERS
    DUMMY_USERS.push(createdUser);
    res.status(201).json({user: createdUser});
    
}

const deleteUser = (req,res,next) => {
    const userId = req.params.uid;
    DUMMY_USERS = DUMMY_USERS.filter(eachUser => eachUser.id !== userId);
    res.status(200).json({message: 'Deleted user.'});
}

const updateUser = (req,res,next) => {
    const { firstName, lastName, dob, email } = req.body;
    const userId = req.params.uid;
    // Update the Object IMMUTABLY
    const updatedUser = { ...DUMMY_USERS.find(eachUser => eachUser.id === userId)};
    const userIndex = DUMMY_USERS.findIndex(eachUser => eachUser.id === userId);
    // Update the old values with new values
    updatedUser.firstName = firstName;
    updatedUser.lastName = lastName;
    updatedUser.dob = dob;
    updatedUser.email = email;
    // replace the old place object with the new one
    DUMMY_USERS[userIndex] = updatedUser;

    res.status(200).json({user: updatedUser}); // 200 since nothing new was created
}


exports.getUserById = getUserById;
exports.getUserByEmail = getUserByEmail;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
