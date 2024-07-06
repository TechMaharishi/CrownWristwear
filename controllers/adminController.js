const productModel = require('../models/products-model');
const adminModel = require('../models/admin-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

module.exports.createAdmin = async function(req, res) {
  try {
    let admin = await adminModel.find();
    if (admin.length > 0) {
      req.flash('error', 'Admin account already exists');
      return res.redirect('/owner');
    }

    let { fullName, email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let createAdmin = await adminModel.create({
      fullName,
      email,
      password: hashedPassword
    });

    req.flash('success', 'Admin account created successfully');
    res.redirect('/owner');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/owner');
  }
};

module.exports.loginAdmin = async function(req, res) {
  try {
    let { email, password } = req.body;

    let admin = await adminModel.findOne({ email });

    if (admin) {
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (passwordMatch) {
        let token = generateToken(admin);
        req.flash('success', 'Logged in successfully');
        return res.redirect('/owner/admin');
      } else {
        req.flash('error', 'Invalid credentials');
        return res.redirect('/owner');
      }
    } else {
      req.flash('error', 'Admin not found');
      return res.redirect('/owner');
    }
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/owner');
  }
};

module.exports.getAdminDashboard = async (req, res) => {
  try {
    let success = req.flash('success');
    let error = req.flash('error');

    res.render('createproducts', { title: 'Admin Dashboard', success, error });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/');
  }
};

module.exports.getAllProducts = async function(req, res) {
  try {
    let products = await productModel.find();
    let success = req.flash('success');
    let error = req.flash('error');
    
    res.render('allproducts', { title: 'All Products', products, success, error });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/owner/admin');
  }
};

module.exports.deleteProduct = async function(req, res) {
  try {
    let productId = req.params.id;

    await productModel.findByIdAndDelete(productId);

    req.flash('success', 'Product deleted successfully');
    res.redirect('/owner/admin/allproducts');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/owner/admin/allproducts');
  }
};

module.exports.logoutAdmin = async function(req, res) {
  try {
    req.flash('success', 'Logged out successfully');
    res.redirect('/owner');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/');
  }
};
