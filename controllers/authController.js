const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const { generateToken } = require('../utils/generateToken');
const flash = require('connect-flash');

module.exports.registerUser = async function(req, res) {
  try {
    let { fullName, email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) {
      req.flash('error', 'You already have an account');
      return res.redirect('/');
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async function(err, hash) {
      if (err) {
        req.flash('error', err.message);
        return res.redirect('/');
      }

      try {
        let newUser = await userModel.create({
          fullName,
          email,
          password: hash,
        });

        let token = generateToken(newUser);
        res.cookie("token", token);
        req.flash('success', 'User created successfully');
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

module.exports.loginUser = async function(req, res) {
  try {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/');
    }

    bcrypt.compare(password, user.password, function(err, result) {
      if (err) {
        req.flash('error', err.message);
        return res.redirect('/');
      }

      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        req.flash('success', 'You have logged in successfully');
        res.redirect('/shop');
      } else {
        req.flash('error', 'E-mail or password incorrect');
        res.redirect('/');
      }
    });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/');
  }
};

module.exports.logoutUser = function(req, res) {
  res.clearCookie('token');
  req.flash('success', 'You have logged out successfully');
  res.redirect('/');
};
