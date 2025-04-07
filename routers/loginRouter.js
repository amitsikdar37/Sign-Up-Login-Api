const express = require('express');
const loginController = require('../controllers/loginController.js');

const LoginRouter = express.Router();

LoginRouter.get('/login', loginController.getLoginPage);
LoginRouter.post('/login', loginController.postLogin);

module.exports = LoginRouter;