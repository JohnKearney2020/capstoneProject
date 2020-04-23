const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Import Routes from Routes folder
const usersRoutes = require('./routes/usersRoutes');

app.use('/api', usersRoutes);

//==================
//  Error Handling
//==================
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