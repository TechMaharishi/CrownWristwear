var express = require('express');
var router = express.Router();
const isLoggedin = require('../middleware/isLoggedIn');

/* GET home page. */
router.get('/', function(req, res, next) {
  let error = req.flash("error");
  res.render("index", {error});
});

router.get('/shop', isLoggedin, function(req, res) {
  res.render('shop');
});

module.exports = router;
