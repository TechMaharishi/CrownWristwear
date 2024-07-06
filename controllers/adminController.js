const productModel = require('../models/products-model');
const adminModel = require('../models/admin-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

// Function to create a new admin account
module.exports.createAdmin = async function(req, res) {
  try {
    // Check if an admin already exists
    let admin = await adminModel.find();
    if (admin.length > 0) {
      req.flash('error', 'Admin account already exists');
      return res.redirect('/owner');
    }

    // Extract the necessary fields from the request body
    let { fullName, email, password } = req.body;

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new admin account with hashed password
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

// Function to handle admin login
module.exports.loginAdmin = async function(req, res) {
  try {
    let { email, password } = req.body;

    // Find admin by email
    let admin = await adminModel.findOne({ email });

    // Check if admin exists and compare passwords
    if (admin) {
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (passwordMatch) {
        // Generate a token for admin (if needed)
        let token = generateToken(admin);
        // Set token in cookie or handle as needed
        req.flash('success', 'Logged in successfully');
        return res.redirect('/owner/admin'); // Example redirect route
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
    // Retrieve flash messages
    let success = req.flash('success');
    let error = req.flash('error');

    res.render('createproducts', { title: 'Admin Dashboard', success, error });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/');
  }
};

// Function to fetch and display all products
module.exports.getAllProducts = async function(req, res) {
  try {
    // Fetch all products from the database
    let products = await productModel.find();

    // Retrieve flash messages
    let success = req.flash('success');
    let error = req.flash('error');

    // Render the view to display all products
    res.render('allproducts', { title: 'All Products', products, success, error });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/owner/admin');
  }
};

// Function to delete a product
module.exports.deleteProduct = async function(req, res) {
  try {
    let productId = req.params.id;

    // Delete the product by ID
    await productModel.findByIdAndDelete(productId);

    req.flash('success', 'Product deleted successfully');
    res.redirect('/owner/admin/allproducts');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/owner/admin/allproducts');
  }
};

// Function to handle admin logout
module.exports.logoutAdmin = async function(req, res) {
  try {
    req.flash('success', 'Logged out successfully');
    res.redirect('/owner'); // Redirect to login page after logout
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('/');
  }
};
