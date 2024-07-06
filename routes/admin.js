// routes/admin.js

var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');
const flash = require('connect-flash'); // Import connect-flash for flash messages

// Route to display admin login page
router.get('/', function(req, res, next) {
  let error = req.flash('error'); // Retrieve error message from flash
  let success = req.flash('success'); // Retrieve success message from flash
  res.render('adminlogin', { title: 'Admin Login', error, success });
});

// Route to create an admin account (if needed)
router.post('/create', adminController.createAdmin);

// Route to handle admin login
router.post('/login', adminController.loginAdmin);

// Route to handle admin logout
router.get('/logout', adminController.logoutAdmin);

// Route to display admin dashboard
router.get('/admin', adminController.getAdminDashboard);

// Route to display all products for admin
router.get('/admin/allproducts', adminController.getAllProducts);

// Route to delete a product
router.post('/admin/deleteproduct/:id', adminController.deleteProduct);

module.exports = router;
