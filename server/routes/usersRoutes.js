const express = require('express');

const router = express.Router();

const usersControllers = require('../controllers/usersControllers');

// remember, the root of this route is '/api/'
//              /api/user/id/
router.get('/user/id/:uid', usersControllers.getUserById);

// remember, the root of this route is '/api/'
//              /api/user/email/
router.get('/user/email/:uemail', usersControllers.getUserByEmail);


module.exports = router; // we export this to our app.js file