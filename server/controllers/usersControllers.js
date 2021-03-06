const HttpError = require('../models/httpError');
// const uuid = require('uuid/v4');
// import { v4 as uuidv4 } from 'uuid';
// import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const User = require('../models/users');
const mongoose = require('mongoose');

//===========================================================
//                  Get a User by ID
//===========================================================
const getUserById = async (req,res,next) => {
    const userId = req.params.uid; // ':uid' in our route
    let user;
    try {
        user = await User.findById(userId); //findById is a function built into mongoose
    } catch (err) {
        const error = new HttpError('Something went wrong with the call to our database.', 500);
        return next(error);
    }

    // Error handling
    if (!user) { //if we don't find a matching user
    // HttpError is a class we created for error handling in our models folder and imported into this file above
        const error = new HttpError('Could not find a user for the provided user id.', 404)  
        return next(error);
    }
    console.log('GET request in Users');
    // getters: true will remove the undscore from "_id" in the auto generated id in our database
    res.json({ user: user.toObject({ getters: true })});
}

//===========================================================
//                  Get a User by Email
//===========================================================
const getUserByEmail = async (req,res,next) => {
    const userEmail = req.params.uemail; // ':uemail' in our route
    let user;
    try {
        user = await User.find({ email: userEmail }); //this will find the place with an email equal to the email we pass to it
    } catch (err) {
        const error = new HttpError('Something went wrong with the call to our database.', 500);
        return next(error);
    }

    // Error handling
    if (!user) { //if we don't find a matching user
    // HttpError is a class we created for error handling in our models folder and imported into this file above
        const error = new HttpError('Could not find a user for the provided email address', 404)
        return next(error);
    }
    
    res.json({user: user.map(user => user.toObject({ getters: true }))});
}

//===========================================================
//                  Create a User / Signup
//===========================================================
const userSignUp = async (req,res,next) => {
// remember, GET requests do not have a body, but POST requests do
// we will use object destructuring to store data pulled from the object as constants
    const { firstName, lastName, dob, email, password } = req.body;
    // validate user input
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }

    //===========================================================
    //        Check if the email address is already taken
    //===========================================================
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });        
    } catch (err) {
        const error = new HttpError('Signing up failed, try again later', 500);
        return next(error);
    }
    if(existingUser){
        const error = new HttpError('A user with that email address already exists. Try logging in instead', 422);
        return next(error);
    }

    const createdUser = new User({
        //remember, instead of { title: title }, we can just do { title } since the key value are both the same
        firstName, 
        lastName, 
        dob, 
        email,
        password,
        products: [] // we handle filling this in during product creation, as opposed to user creation here
    });

    console.log('got to just before saving user');
    try {
        await createdUser.save(); // this is from Mongoose, and will save our new place in our MondoDB database
    } catch (err) {
        const error = new HttpError(
            'Creating a new user failed, please try again',
            500
        );
        return next(error); // needed to prevent further code execution on an error.
    }
    res.status(201).json({user: createdUser.toObject({ getters: true })}); // 201 is the standard response code if something *new* was sucessfully created on the server
}

//===========================================================
//                  Delete a User by ID
//===========================================================
const deleteUser = async (req,res,next) => {
    const userId = req.params.uid;
    let user;
    try {
        user = await User.findByIdAndDelete(userId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not delete user.', 500);
        return next(error);
    }
    res.status(200).json({message: 'Deleted user.'}); // 201 is the standard response code if something *new* was sucessfully created on the server    
}

//===========================================================
//                  Update a User's Info
//===========================================================
const updateUser = async (req,res,next) => {
    const { firstName, lastName, dob, email, password } = req.body;
    // validate user input
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }
    const userId = req.params.uid;
    // Update the Object IMMUTABLY

    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update user data.', 500);
        return next(error);
    }
    
    // Update the old values with new values
    user.firstName = firstName;
    user.lastName = lastName;
    user.dob = dob;
    user.email = email;
    user.password = password;

    //save the new user data
    try {
        await user.save();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update user data', 500);
        return next(error);
    }
    res.status(200).json({user: user.toObject({ getters: true })}); // 200 since nothing new was created
}

//===========================================================
//                  Get all Users
//===========================================================
const getAllUsers = async (req,res,next) => {
    let users;
    try {
        users = await User.find({}, '-password'); //this will return everything except the password
    } catch (err) {
        const error = new HttpError('Fetching users failed, please try again later.', 500);
        return next(error);
    };
    //remember, .find() returns an array, so we can't just use .toObject() right away like we do in other parts of this code
    res.json({ users: users.map(user => user.toObject({ getters: true }))});
}

//===========================================================
//                  User Login
//===========================================================
const userLogin = async (req,res,next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });        
    } catch (err) {
        const error = new HttpError('Logging in failed, try again later', 500)
        return next(error);
    }
    // if a user with that email doesn't exist or the passwords don't match
    if(!existingUser || existingUser.password !== password){
        const error = new HttpError('Invalid credentials, could not log you in.', 401);
        return next(error);
    }
    res.json({message: "Logged in."})
}


//=================================================================================================================================
//                                                  Add a Product to a User's Wishlist
//=================================================================================================================================
const addProductToWishList = async(req,res,next) => {
    const { productId } = req.body;
    let userId = req.params.uid;
    
    // validate user input
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }
    //==========================================
    //      Update the user wishlist info
    //==========================================
    // check if the user ID provided exists or not
    let user;
    try {
        user = await User.findById(userId); // see if the user id for our product is a real user id
    } catch (err) {
        console.log(user);
        const error = new HttpError('Adding product to wishlist failed, please try again.', 500);
        return next(error);
    }
    // if the user does not exist
    if(!user) {
        const error = new HttpError('Could not find user for provided id', 404);
        return next(error);
    }
    console.log(user);

    try {
        const sess = await mongoose.startSession(); // start a session first
        console.log('session started');
        sess.startTransaction(); // start a transaction next
        console.log('transaction started');
        // ---------------------------------------------------------------
        //    Add the Product Id to the corresponding User's wishlist
        // ---------------------------------------------------------------
        // *Very Important* below, 'wishlist' refers to our collection called 'wishlist', user refers to the variable we defined above
        user.wishlist.push(productId); // this updates the user with this product id 
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
            'Adding the product to the wishlist failed, please try again',
            500
        );
        return next(error); // needed to prevent further code execution on an error.
    }
    res.status(201).json({user: user}); // 201 is the standard response code if something *new* was sucessfully created on the server
}

//=================================================================================
//                             Delete an Item from a Wishlist
//=================================================================================
// this will also delete the product id from the user that created it
const deleteWishlistItem = async (req,res,next) => {
    const userId = req.params.uid;
    const { productId } = req.body;
    
    // validate user input
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }

    // check if the user ID provided exists or not
    let user;
    try {
        user = await User.findById(userId); // see if the user id for our product is a real user id
    } catch (err) {
        const error = new HttpError('Remove wishlist item failed, please try again.', 500);
        return next(error);
    }
    // if the user does not exist
    if(!user) {
        const error = new HttpError('Could not find user for provided id', 404);
        return next(error);
    }
    // console.log(user);
    
    // at this point we've found the user with the user id provided
    try {
        // delete the matching product if it exists
        const sess = await mongoose.startSession(); // start a session first
        sess.startTransaction(); // start a transaction next
        // remove the product
        await user.wishlist.pull(productId); //remove the product id from the wishlist
        // save the updated user
        console.log('ProductId', productId);
        console.log(user);
        console.log('user wishlist updated, but not yet saved.');
        // try {
        //     await product.creator.save({ session: sess });
        // } catch (err) {
        //     console.log(err);
        // }
        await user.save({ session: sess });
        console.log('user wishlist saved.');
        await sess.commitTransaction();
        console.log('transaction commited');
    } catch (err) {
        const error = new HttpError('Something went wrong, could not delete product.', 500);
        return next(error);
    }
    
    res.status(200).json({message: 'Removed wishlish item.'}); // 201 is the standard response code if something *new* was sucessfully created on the server
}


exports.getUserById = getUserById;
exports.getUserByEmail = getUserByEmail;
exports.userSignUp = userSignUp;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.getAllUsers = getAllUsers;
exports.userLogin = userLogin;
exports.addProductToWishList = addProductToWishList;
exports.deleteWishlistItem = deleteWishlistItem;
