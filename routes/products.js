var express = require('express');
var router = express.Router();
const productsModel = require('../models/products-model');
const upload = require('../config/multer-config');

router.post('/create', upload.single('image'), async function(req, res, next) {
  try {
    let { name, price, discount, bgColor, textColor, panelColor } = req.body;
    let product = await productsModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgColor,
      textColor,
      panelColor,
    });
    req.flash("success", "Product created successfully");
    res.redirect('/owner/admin');
  } catch (err) {
    req.flash("error", err.message);
    res.redirect('/owner/admin');
  }
});

module.exports = router;
