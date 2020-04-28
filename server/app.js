const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const HttpError = require('./models/httpError');
const mongoose = require('mongoose');

// Import Routes from Routes folder
const usersRoutes = require('./routes/usersRoutes');

// body-parser middleware
// middleware is parsed from top to bottom in this file, so we want to parse the body here before we parse any routes
// this will convert any json data into javascript useable items like arrays and objects
// next() is automatically called by this middleware and will pass the data on to the other middleware automatically
app.use(bodyParser.json());


app.use('/api/users/', usersRoutes);

//==================
//  Error Handling
//==================
// this will trigger if a request was sent to a url that doesn't exist, therefore not triggering any sort of response to be sent from middleware above
app.use((req,res,next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
    // return next(
    //     new HttpError('Could not find a user for the provided user id.', 404)
    // );
})

// this will trigger if any middleware in front of it triggered an error
app.use((error, req, res, next) => {
    // If somehow we have already sent a response, pass the error to the next middleware
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500); //if the error has a status code with it, use that, otherwise default to 500
    // 500 indicates something went wrong on the server
    res.json({message: error.message || 'An unknown error occurred!'}); // if the error object doens't have a message property, send 'An unknown error occured!'
})

// the 'places' characters in the string below will name our database to 'places', we named the collection inside that database to 'places' in our
// 'places.js' file in the 'models' folder.
let connectURL = 'mongodb+srv://Admin:m5mLsOvp5NVkinUL@capstone-project-database-gjb48.mongodb.net/users?retryWrites=true&w=majority';
mongoose
    .connect(connectURL)
    .then(() => { // if we sucessfully connect to the database, start our server
        app.listen(5001);
        console.log('connected to database sucessfully');
    })
    .catch((err) => {
        console.log(err);
    });