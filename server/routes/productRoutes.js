const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); //check is used for validation
const productControllers = require('../controllers/productControllers');


// base path: /api/products/

//===========================================================
//                  Create a Product
//===========================================================
//typically the identifying data is encoded into the URL, and the data with which you work is encoded into the request body, as below
router.post('/create',
    [
        check('productName')
            .not()
            .isEmpty(),
        check('title')
            .not()
            .isEmpty(),
        check('productDescription').isLength({min: 10}),
        check('cost')
            .not()
            .isEmpty(),
        check('shippingCost')
            .not()
            .isEmpty(),
        check('freeShipEligible')
            .not()
            .isEmpty(),
        check('shippingFrom')
            .not()
            .isEmpty(),
        check('shipTimeEst')
            .not()
            .isEmpty(),
        check('shipReadyTime')
            .not()
            .isEmpty(),
        //dropDownTitle and dropDownOptions can be left blank if the use doesn't want any options
        check('category')
            .not()
            .isEmpty(),
        check('creator')
            .not()
            .isEmpty()
    ],
    productControllers.createProduct
);

//===========================================================
//                  Delete a Product by ID
//===========================================================
//typically the identifying data is encoded into the URL, and the data with which you work is encoded into the request body, as below
router.delete('/delete/:pid', productControllers.deleteProduct);

//===========================================================
//                  Get Products by User ID
//===========================================================
router.get('/getbyuserid/:uid', productControllers.getProductsByUserId)

// base path: /api/products/
//===========================================================
//                  Update Product Information
//===========================================================
router.patch('/id/:pid',
    [
        check('productName')
            .not()
            .isEmpty(),
        check('title')
            .not()
            .isEmpty(),
        check('productDescription').isLength({min: 10}),
        check('cost')
            .not()
            .isEmpty(),
        check('shippingCost')
            .not()
            .isEmpty(),
        check('freeShipEligible')
            .not()
            .isEmpty(),
        check('shippingFrom')
            .not()
            .isEmpty(),
        check('shipTimeEst')
            .not()
            .isEmpty(),
        check('shipReadyTime')
            .not()
            .isEmpty(),
        //dropDownTitle and dropDownOptions can be left blank if the use doesn't want any options
        check('category')
            .not()
            .isEmpty()
    ],
    productControllers.updateProduct
);



module.exports = router; // we export this to our app.js file