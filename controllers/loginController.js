const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const Voters = require('../models/voters.js');
const { check, validationResult } = require('express-validator');


exports.getLoginPage = (req, res) => {
  res.render('login');
};

exports.postLogin = [
  
  check('email')
  .normalizeEmail()
  .isEmail()
  .withMessage('Valid email is required'),

  check('password')
  .trim()
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
  .withMessage('Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters long'),

  
  async (req, res, next) => {
    const {email, password} = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('login', { 
        errors: errors.mapped(),
        formData: { email }
        
      });
    }
    const user = await Voters.findByEmail(req.body.email);
    if (!user) {
      return res.render('login', {
        errors: { auth: { msg: 'Invalid email or password' } },
        formData: { email }
      });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.render('login', {
        errors: { auth: { msg: 'Invalid email or password' } },
        formData: { email }
      });
    }

    res.render('login-success');

  }
];