const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const Voters = require('../models/mongoose-models'); // Adjust the path as necessary
const { check, validationResult } = require('express-validator');

exports.getSignUpPage = (req, res) => {
  res.render('signup', { errors: [] });
};

exports.handleSignUp = [
  check('firstname')
  .trim()
  .isLength({ min: 2 })
  .matches(/^[a-zA-Z]+$/)
  .withMessage('First name must be at least 2 characters long and contain only letters')
  .notEmpty()
  .withMessage('First name is required'),

  check('lastname')
  .trim()
  .isLength({ min: 2 })
  .matches(/^[a-zA-Z]+$/)
  .withMessage('Last name must be at least 2 characters long and contain only letters')
  .notEmpty().
  withMessage('Last name is required'), 

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

  check('confirmPassword')
  .trim()
  .notEmpty()
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),

  check('role')
  .notEmpty()
  .withMessage('Role is required')
  .isIn(['voter', 'admin'])
  .withMessage('Role must be either voter or admin'),
  
  async (req, res) => {
    try {
      const { firstname, lastname, email, password, role } = req.body;
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.render('signup', { 
          errors: errors.array(),
          formData: { firstname, lastname, email, role }
        });
      }
      
      const hashedPassword = await bcrypt.hash(password, 12);
      const voter = new Voters({  // Changed from Voter to Voters to match the imported model
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role
      });
      
      await voter.save();  // Using await instead of then/catch
      console.log('Voter saved successfully:', voter);
      return res.render('signup-success');  // Added return and removed duplicate render
      
    } catch (err) {
      console.error('Error saving voter:', err);
      res.render('signup', {
        errors: [{ msg: err.message || 'Error creating user account' }],
        formData: req.body
      });
    }
  }
]