const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const HttpError = require('./models/httpError');

// Import Routes from Routes folder
const usersRoutes = require('./routes/usersRoutes');

// body-parser middleware
// middleware is parsed from top to bottom in this file, so we want to parse the body here before we parse any routes
// this will convert any json data into javascript useable items like arrays and objects
// next() is automatically called by this middleware and will pass the data on to the other middleware automatically
app.use(bodyParser.json());


app.use('/api/user/', usersRoutes);

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

app.listen(5001);