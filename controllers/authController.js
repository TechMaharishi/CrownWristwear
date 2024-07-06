const userModel = require('../models/user-model'); // Import the user model
const bcrypt = require('bcrypt'); // Import bcrypt for hashing passwords
const jwt = require('jsonwebtoken'); // Import JSON Web Token for creating tokens
const cookie = require('cookie-parser'); // Import cookie-parser for managing cookies
const { generateToken } = require('../utils/generateToken'); // Import the generateToken utility function
const flash = require('connect-flash'); // Import connect-flash for flash messages

// For creating new users
module.exports.registerUser = async function(req, res) {
  try {
    // Extract fullName, email, and password from the request body
    let { fullName, email, password } = req.body;

    // Check if a user with the given email already exists
    let user = await userModel.findOne({ email: email });
    if (user) {
      req.flash('error', 'You already have an account');
      return res.redirect('/');
    }

    const saltRounds = 10; // Number of salt rounds for hashing the password
    // Hash the password using bcrypt
    bcrypt.hash(password, saltRounds, async function(err, hash) {
      if (err) {
        req.flash('error', err.message);
        return res.redirect('/');
      }

      try {
        // Create a new user with the hashed password
        let newUser = await userModel.create({
          fullName,
          email,
          password: hash,
        });

        // Generate a token for the new user
        let token = generateToken(newUser);
        // Set the token as a cookie in the response
        res.cookie("token", token);
        // Set success flash message
        req.flash('success', 'User created successfully');
        // Redirect to shop route
        res.redirect('/shop');
      } catch (createErr) {
        req.flash('error', createErr.message);
        res.redirect('/');
      }
    });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/');
  }
};

// For logging in users
module.exports.loginUser = async function(req, res) {
  try {
    // Extract email and password from the request body
    let { email, password } = req.body;

    // Find the user with the given email
    let user = await userModel.findOne({ email: email });
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/');
    }

    // Compare the provided password with the stored hashed password
    bcrypt.compare(password, user.password, function(err, result) {
      if (err) {
        req.flash('error', err.message);
        return res.redirect('/');
      }

      if (result) {
        // If the password matches, generate a token for the user
        let token = generateToken(user);
        // Set the token as a cookie in the response
        res.cookie("token", token);
        // Set success flash message
        req.flash('success', 'You have logged in successfully');
        // Redirect to shop route
        res.redirect('/shop');
      } else {
        // If the password does not match, send an error message
        req.flash('error', 'E-mail or password incorrect');
        res.redirect('/');
      }
    });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/');
  }
};

// For logging out users
module.exports.logoutUser = function(req, res) {
  // Clear the token cookie to log the user out
  res.clearCookie('token');
  // Set success flash message
  req.flash('success', 'You have logged out successfully');
  // Redirect to the home page or any other appropriate page
  res.redirect('/');
};

