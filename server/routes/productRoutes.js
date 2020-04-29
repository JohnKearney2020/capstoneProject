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
        check('productDescription').isLength({min: 10}),
        check('cost')
            .not()
            .isEmpty(),
        check('creator')
            .not()
            .isEmpty()
    ],
    productControllers.createProduct
);
// router.get('/create', productControllers.createProduct);
module.exports = router; // we export this to our app.js file