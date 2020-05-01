const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const productSchema = new Schema({

    productName: { type: String, required: true },
    title: { type: String, required: true },
    picture: { type: String, required: false }, //maybe the user wants to get a good picture and upload later
    productDescription: { type: String, required: true }, 
    cost: { type: Number, required: true }, 
    shippingCost: { type: Number, required: true },  
    freeShipEligible: { type: Boolean, required: true },
    shippingFrom: { type: String, required: true },
    shipTimeEst: { type: String, required: true },
    shipReadyTime: { type: String, required: true },
    dropDownTitle: { type: String, required: false },
    dropDownOptions: { type: Array, required: false },
    category: { type: String, required: true },
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


module.exports = mongoose.model('Product', productSchema); // model() will return a constructor function later
// remember, this will be the name of our collection, and will be automatically renamed to 'places'
