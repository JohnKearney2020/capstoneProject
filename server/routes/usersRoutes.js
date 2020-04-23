const express = require('express');

const router = express.Router();

const usersControllers = require('../controllers/usersControllers');

// remember, the root of this route is '/api/user/'
//              /api/user/id/
router.get('/:uid', usersControllers.getUserById);

// remember, the root of this route is '/api/'
//              /api/user/email/
router.get('/email/:uemail', usersControllers.getUserByEmail);

// note, by default any address entered in the browser is a GET request, so we can't use the below in browser, we will use Postman
router.post('/', usersControllers.createUser);
//typically the identifying data is encoded into the URL, and the data with which you work is encoded into the request body, as below
router.delete('/:uid', usersControllers.deleteUser);
router.patch('/:uid', usersControllers.updateUser);

module.exports = router; // we export this to our app.js file