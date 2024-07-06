const express = require('express');
const router = express.Router();
const userModel = require('../models/user-model');
const productModel = require('../models/products-model');
const isLoggedIn = require('../middleware/isLoggedIn');

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
      let filter = req.query.filter;

      let products = [];

      if (filter === 'availability') {
          products = await productModel.find().sort({ createdAt: -1 }).limit(4);
      } else if (filter === 'discount') {
          products = await productModel.find({ discount: { $gt: 0 } });
      } else {
          products = await productModel.find();
      }

      products.forEach(product => {
          if (product.discount > 0) {
              product.discountedPrice = product.price - (product.price * (product.discount / 100));
          } else {
              product.discountedPrice = product.price;
          }
      });

      if (sortby === 'lowToHigh') {
          products.sort((a, b) => a.discountedPrice - b.discountedPrice);
      } else if (sortby === 'highToLow') {
          products.sort((a, b) => b.discountedPrice - a.discountedPrice);
      }

      let error = req.flash("error");
      let success = req.flash("success");
      res.render('shop', { products, error, success, sortby });
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
