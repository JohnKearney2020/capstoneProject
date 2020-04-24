const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); //check is used for validation
const usersControllers = require('../controllers/usersControllers');

//===========================================================
//                  Get User by ID
//===========================================================
// remember, the root of this route is '/api/users/'
router.get('/id/:uid', usersControllers.getUserById);

//============================================================
//                  Get User by Email
//============================================================
// remember, the root of this route is '/api/users/'
router.get('/email/:uemail', usersControllers.getUserByEmail);

// note, by default any address entered in the browser is a GET request, so we can't use the below in browser, we will use Postman

//===========================================================
//                  Create a User
//===========================================================
//typically the identifying data is encoded into the URL, and the data with which you work is encoded into the request body, as below
router.post('/signup',
    [
        check('firstName')
            .not()
            .isEmpty(),
        check('lastName')
            .not()
            .isEmpty(),
        check('dob')
            .not()
            .isEmpty(),
        check('email')
            .normalizeEmail()
            .isEmail(),
        check('password').isLength({ min: 6})
    ],
    usersControllers.userSignUp
);


//===========================================================
//                  Delete a User by ID
//===========================================================
//typically the identifying data is encoded into the URL, and the data with which you work is encoded into the request body, as below
router.delete('/id/:uid', usersControllers.deleteUser);

//===========================================================
//                  Update User Information
//===========================================================
router.patch('/id/:uid',
    [
        check('firstName')
            .not()
            .isEmpty(),
        check('lastName')
            .not()
            .isEmpty(),
        check('dob')
            .not()
            .isEmpty(),
        check('email')
            .normalizeEmail()
            .isEmail(),
        check('password').isLength({ min: 6})        
    ],
    usersControllers.updateUser);

//===========================================================
//                  Get All Users
//===========================================================
// remember, the root of this route is '/api/users/'
router.get('/getall', usersControllers.getAllUsers);

//===========================================================
//                  User Login
//===========================================================
router.post('/login', usersControllers.userLogin);


module.exports = router; // we export this to our app.js file