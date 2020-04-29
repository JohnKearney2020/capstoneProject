const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    cost: { type: Number, required: true },
    //===========================================================================================
    //                              Linking Products and Users
    //===========================================================================================
    // here were are specifying the we want this to be a MongoDB id with 'mongoose.Types.ObjectId
    // 'ref' needs to refer to the model we want to link with, in this case our 'User' model
    // we need to set up something similar in our 'user.js' model file
    // note: a product can only have one user as its creator, so we leave this object as is. This differs from our 'user.js' model where a single
    // user can have multiple products, so we store product id's there as an array of objects.
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
})

// productSchema.plugin(uniqueValidator); //how we use mongoose-unique-validator

module.exports = mongoose.model('Product', productSchema); // model() will return a constructor function later
// remember, this will be the name of our collection, and will be automatically renamed to 'places'

// firstName, 
// lastName, 
// dob, 
// email,
// password