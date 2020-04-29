const HttpError = require('../models/httpError');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const Product = require('../models/product');
const User = require('../models/users');
const mongoose = require('mongoose');

const createProduct = async(req,res,next) => {
    const { productName, productDescription, cost, creator } = req.body;
    // validate user input
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }

    const createdProduct = new Product({
        //remember, instead of { title: title }, we can just do { title } since the key value are both the same
        productName, 
        productDescription, 
        cost,
        image:'https://i.imgur.com/Qx6AMQQ.jpg',
        creator
    });

    //============================================================
    //                 Linking Products and Users
    //============================================================
    // check if the user ID provided exists or not
    let user;
    try {
        user = await User.findById(creator); // see if the user id for our place is a real user id
    } catch (err) {
        console.log(user);
        const error = new HttpError('Creating product failed, please try again.', 500);
        return next(error);
    }
    // if the user does not exist
    if(!user) {
        const error = new HttpError('Could not find user for provided id', 404);
        return next(error);
    }
    console.log(user);
    try {
        // ===============================================================================================================================
        //                Executing multiple operations not directly related to each other using SESSIONS and TRANSACTIONS
        // ===============================================================================================================================
        // ***IMPORTANT*** USING THIS METHOD A COLLECTION MUST BE MANUALLY CREATED *BEFORE* THIS CODE EVER EXECUTES
        // this can be done easily in MongoDB Atlas. In this case we need to create a 'products' collection
        // previously, the collection would be created automatically if it didn't already exist. That WILL NOT work here

        // @@@@@@@@@@@@@@@@@@@@
        // first, we will save the product with the user id provided since we verified it's an id that exists
        // second, we will add the product id to the corresponding user
        // if either of those operations fail, we want to make sure that all operations are undone, and we want to do both only if both operations succeed
        // we need to use *sessions* and *Transactions* to accomplish this
        // Transactions - allows us to perform multiple operations independent of one another and undo them if needed. Transactions are built on
        // sessions, therefore we need to start a session first
        const sess = await mongoose.startSession(); // start a session first
        console.log('session started');
        sess.startTransaction(); // start a transaction next
        console.log('transaction started');
        // need to provide our current session as an argument for our .save()
        try {
            await createdProduct.save({ session: sess }); //always add await before save since it is asynchronous
        } catch (err) {
            console.log(err);
        }
        await createdProduct.save({ session: sess }); //always add await before save since it is asynchronous
        console.log('product saved');
        // --------------------------------------------------
        //    Add the place Id to the corresponding User
        // --------------------------------------------------
        // *Very Important* below, 'products' refers to our collection called 'products', user refers to the variable we defined above
        user.products.push(createdProduct); // this updates the user with this product id 
        // this push is different than standard js push(), it's a mongoose method that will link the user and product
        console.log('user updated');
        //now we need to save our updated user
        await user.save({ session: sess });
        console.log('user saved');
        // lastly, if we successfully created and saved a product, updated and saved the user, we need to commit our Transaction
        await sess.commitTransaction(); // this is the point where changes are actually saved to our database. Had any of the above tasks failed
        // the data would have been rolled back automatically by MongoDB.
        console.log('transaction commited');

    } catch (err) {
        const error = new HttpError(
            'Creating a new product failed, please try again',
            500
        );
        return next(error); // needed to prevent further code execution on an error.
    }

    res.status(201).json({product: createdProduct}); // 201 is the standard response code if something *new* was sucessfully created on the server
    




    // res.status(201).json({product: createdProduct.toObject({ getters: true })}); // 201 is the standard response code if something *new* was sucessfully created on the server
}

exports.createProduct = createProduct;

//===========================================================
//                  Create a User / Signup
//===========================================================
// const userSignUp = async (req,res,next) => {
//     // remember, GET requests do not have a body, but POST requests do
//     // we will use object destructuring to store data pulled from the object as constants
//         const { firstName, lastName, dob, email, password } = req.body;
//         // validate user input
//         const errors = validationResult(req);
//         if(!errors.isEmpty()){
//             console.log(errors);
//             return next(
//                 new HttpError('Invalid inputs passed, please check your data.', 422)
//             )
//         }
    
//         //===========================================================
//         //        Check if the email address is already taken
//         //===========================================================
//         let existingUser;
//         try {
//             existingUser = await User.findOne({ email: email });        
//         } catch (err) {
//             const error = new HttpError('Signing up failed, try again later', 500);
//             return next(error);
//         }
//         if(existingUser){
//             const error = new HttpError('A user with that email address already exists. Try logging in instead', 422);
//             return next(error);
//         }
    
//         const createdUser = new User({
//             //remember, instead of { title: title }, we can just do { title } since the key value are both the same
//             firstName, 
//             lastName, 
//             dob, 
//             email,
//             password
//         });
    
//         console.log('got to just before saving user');
//         try {
//             await createdUser.save(); // this is from Mongoose, and will save our new place in our MondoDB database
//         } catch (err) {
//             const error = new HttpError(
//                 'Creating a new user failed, please try again',
//                 500
//             );
//             return next(error); // needed to prevent further code execution on an error.
//         }
//         res.status(201).json({user: createdUser.toObject({ getters: true })}); // 201 is the standard response code if something *new* was sucessfully created on the server
//     }