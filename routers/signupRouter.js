const express = require('express');
const signUpController = require('../controllers/signupController.js');

const signUpRouter = express.Router();

signUpRouter.get('/signup', signUpController.getSignUpPage);
signUpRouter.post('/signup', signUpController.handleSignUp);

module.exports = signUpRouter;
