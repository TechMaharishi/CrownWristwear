const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const productModel = require('../models/products-model');
const isLoggedIn = require('../middleware/isLoggedIn');
const { query } = require('express');

router.get('/', function(req, res, next) {
  let error = req.flash("error");
  let success = req.flash("success");
  let loggedIn = false;
  const user = req.user;
  res.render("index", { loggedIn, error, success, user });
});

router.get('/shop', isLoggedIn, async function(req, res) {
  try {
    let sortby = req.query.sortby || 'lowToHigh';
    let category = req.query.category || 'None'; // Default to 'None' if no category is selected

    let query = {};

    // Apply category filter if selected
    if (category !== 'None') {
      query = { ...query, category };
    }

    let products = await productModel.find(query);

    // Calculate discounted price for each product
    products.forEach(product => {
      if (product.discount > 0) {
        product.discountedPrice = product.price - (product.price * (product.discount / 100));
      } else {
        product.discountedPrice = product.price;
      }
    });

    // Sort products based on sortby parameter
    if (sortby === 'lowToHigh') {
      products.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sortby === 'highToLow') {
      products.sort((a, b) => b.discountedPrice - a.discountedPrice);
    }

    let error = req.flash("error");
    let success = req.flash("success");

    // Pass products, error, success messages, sortby, and category to the view
    res.render('shop', { products, error, success, sortby, category });
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
