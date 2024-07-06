// index.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const productModel = require('../models/products-model');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', function(req, res, next) {
  let error = req.flash("error");
  let success = req.flash("success");
  // let loggedIn = !!req.cookies.token;
  let loggedIn = false;
  const user = req.user;
  res.render("index", { loggedIn, error, success, user });
  console.log(loggedIn);
});

router.get('/shop', isLoggedIn, async function(req, res) {
  try {
    let products = await productModel.find();
    let error = req.flash("error"); // Add error flash message
    let success = req.flash("success"); // Add success flash message
    res.render('shop', { products, error, success }); // Pass error and success messages to shop template
  } catch (err) {
    req.flash("error", err.message);
    res.redirect('/');
  }
});

router.get('/addtocart/:productid', isLoggedIn, async function(req, res){
  try {
    let user = await userModel.findOne({ email: req.user.email });
    if (user) {
      user.cart.push(req.params.productid);
      await user.save();
      req.flash("success", "Product Added To Cart");
    } else {
      req.flash("error", "User not found");
    }
  } catch (err) {
    req.flash("error", err.message);
  }
  res.redirect('/shop');
});

router.get('/cart', isLoggedIn, async function(req, res){
  let user = await userModel.findOne({email: req.user.email}).populate('cart');
    res.render('cart', { user });
});

module.exports = router;
