const HttpError = require('../models/httpError');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const Product = require('../models/product');
const User = require('../models/users');
const mongoose = require('mongoose');

//=================================================================================================================================
//                                                            Create a Product
//=================================================================================================================================
// this will also associate the product id with the user that created it
const createProduct = async(req,res,next) => {
    // const { productName, productDescription, cost, creator } = req.body;
    const { 
        productName, 
        title, 
        picture, 
        productDescription, 
        cost, 
        shippingCost, 
        freeShipEligible, 
        shippingFrom, 
        shipTimeEst,
        shipReadyTime,
        dropDownTitle,
        dropDownOptions,
        category,
        creator
    } = req.body;

    // validate user input
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }

    const createdProduct = new Product({
        productName, 
        title, 
        picture, 
        productDescription, 
        cost, 
        shippingCost, 
        freeShipEligible, 
        shippingFrom, 
        shipTimeEst,
        shipReadyTime,
        dropDownTitle,
        dropDownOptions,
        category,
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
        // await createdProduct.save({ session: sess }); //always add await before save since it is asynchronous
        try {
            await createdProduct.save({ session: sess }); //always add await before save since it is asynchronous
        } catch (err) {
            console.log(err);
        }
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
    
}


//=================================================================================
//                                 Delete a Product
//=================================================================================
// this will also delete the product id from the user that created it
const deleteProduct = async (req,res,next) => {
    const productId = req.params.pid;
    let product;
    // find a product with a matching id
    try {
        // populate lets us refer to a document stored in a different collection and work with the data in that document
        // a link between the two collections must be established for populate() to work, which we did for linking users to products already
        product = await Product.findById(productId).populate('creator');
    } catch (err) {
        const error = new HttpError('Something went wrong, could not delete product, try again.', 500);
        return next(error);
    }

    // if we didn't find a matching place
    if(!product) {
        const error = new HttpError('Could not find a product with that id.', 404);
        return next(error);
    }
    

    try {
        // delete the matching product if it exists
        const sess = await mongoose.startSession(); // start a session first
        sess.startTransaction(); // start a transaction next
        // remove the product
        await product.remove({ session: sess });
        // ***We can do what we do below b/c populate gave us the full user object linked to this product***
        // below, 'products' is our collection name. This is actually manipulating data from our 'users' collection though
        product.creator.products.pull(product); // pull will automatically remove the product id from the corresponding user
        // save the updated user
        await product.creator.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not delete product.', 500);
        return next(error);
    }
    
    res.status(200).json({message: 'Deleted product.'}); // 201 is the standard response code if something *new* was sucessfully created on the server
}


//=================================================================================================================================
//                                                          Get Products by UserId
//=================================================================================================================================
const getProductsByUserId = async (req,res,next) => {
    const userId = req.params.uid;
    // let places;
    userWithProducts = await User.findById(userId).populate('products'); //here, 'places' refers to the array of places attached to each user in our db
    try {
        products = await Product.find({ creator: userId }) //this will find the place with a creator id equal to the user id we pass to it
        //it will return an array
    } catch (err) {
        const error = new HttpError('Something went wrong with the call to our database, try again later', 500);
        return next(error);
    }
    // Error handling
    if (!userWithProducts || userWithProducts.products.length === 0) { //if we don't find a matching place
        // HttpError is a class we created for error handling in our models folder and imported into this file above
        const error = new HttpError('Could not find any products for the provided creator id.', 404)
        return next(error);
    }

    console.log('GET request in Places');
    // ***NOTE: find() returns an array, so we can't use .toObject() like we did with .findById(), need to use .map() first ***
    res.json({places: userWithProducts.products.map(product => product.toObject({ getters: true }))});
}

//===========================================================
//                  Update a Product's Info
//===========================================================
const updateProduct = async (req,res,next) => {
    const { 
        productName, 
        title, 
        picture, 
        productDescription,
        cost, 
        shippingCost, 
        freeShipEligible, 
        shippingFrom, 
        shipTimeEst, 
        shipReadyTime,
        dropDownTitle,
        dropDownOptions,
        category,
    } = req.body;

    // validate user input
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        )
    }
    const productId = req.params.pid;
    // Update the Object IMMUTABLY

    let product;
    try {
        product = await Product.findById(productId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update product data, try again later.', 500);
        return next(error);
    }
    
    // Update the old values with new values
    product.productName = productName;
    product.title = title;
    product.picture = picture;
    product.productDescription = productDescription;
    product.cost = cost;
    product.shippingCost = shippingCost;
    product.freeShipEligible = freeShipEligible;
    product.shippingFrom = shippingFrom;
    product.shipTimeEst = shipTimeEst;
    product.shipReadyTime = shipReadyTime;
    product.dropDownTitle = dropDownTitle;
    product.dropDownOptions = dropDownOptions;
    product.category = category;

    //save the new user data
    try {
        await product.save();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update product data', 500);
        console.log(err);
        return next(error);
    }
    res.status(200).json({product: product.toObject({ getters: true })}); // 200 since nothing new was created
}




exports.createProduct = createProduct;
exports.deleteProduct = deleteProduct;
exports.getProductsByUserId = getProductsByUserId;
exports.updateProduct = updateProduct;

