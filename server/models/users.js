const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: String, required: true },
    email: { type: String, required: true, unique: true }, //unique will create an index for the email, speeds up querying process
    // unlike in SQL, unique does not mean that users cannot sign up using an already existing email. We need mongoose-unique-validator for that
    password: { type: String, required: true }
})

userSchema.plugin(uniqueValidator); //how we use mongoose-unique-validator

module.exports = mongoose.model('User', userSchema); // model() will return a constructor function later
// remember, this will be the name of our collection, and will be automatically renamed to 'places'

// firstName, 
// lastName, 
// dob, 
// email,
// password