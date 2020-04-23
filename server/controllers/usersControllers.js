const HttpError = require('../models/httpError');

const DUMMY_USERS = [
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


exports.getUserById = getUserById;
exports.getUserByEmail = getUserByEmail;
