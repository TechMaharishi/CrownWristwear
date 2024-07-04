const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const { generateToken } = require('../utils/generateToken');

// For creating new users
module.exports.registerUser = async function(req, res) {
  try {
    let { fullName, email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(401).send("You already have an account");
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async function(err, hash) {
      if (err) return res.status(500).send(err.message);
      
      try {
        let newUser = await userModel.create({
          fullName,
          email,
          password: hash,
        });

        let token = generateToken(newUser);
        res.cookie("token", token);        
        res.send("User Created Successfully");
      } catch (createErr) {
        res.status(500).send(createErr.message);
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// User to login
module.exports.loginUser = async function(req, res) {
  try {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (!user) return res.status(404).send("User not found");

    bcrypt.compare(password, user.password, function(err, result) {
      if (err) return res.status(500).send(err.message);
      
      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        res.send("You have logged in successfully");
      } else {
        res.status(401).send("E-mail or password incorrect");
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
