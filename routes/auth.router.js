const express = require('express');

const signupHandler = require('../controllers/signupController');
const loginHandler = require('../controllers/loginController');
const userLoggedIn = require('../controllers/userLoggedInController');


const router = express.Router();

router.route("/signup")
    .post(signupHandler);

router.route("/signin")
    .post(loginHandler)

router.route("/me")
    .get(userLoggedIn)


module.exports = router;
