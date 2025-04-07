const express = require('express');
const homepageController = require('../controllers/homepageController.js');

const homePageRouter = express.Router();

homePageRouter.get('/', homepageController.homepage);

module.exports = homePageRouter;