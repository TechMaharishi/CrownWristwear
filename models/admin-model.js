const mongoose = require('mongoose');

// Define the Admin schema
const adminSchema = new mongoose.Schema({
  fullName: {
    type: String, // Data type is String
    required: true, // Full Name is required
    minlength: 3, // Minimum length should be 3 characters
    maxlength: 32, // Maximum length should be 32 characters
    trim: true, // Remove white spaces from both ends
  },
  email: {
    type: String, // Data type is String
    required: true, // Email is required
    trim: true, // Remove white spaces from both ends
    unique: true, // Email must be unique
  },
  password: {
    type: String, // Data type is String
    required: true, // Password is required
    trim: true, // Remove white spaces from both ends
  },
  product: {
    type: Array, // Data type is Array
    default: [], // Default value is an empty array
  },
  picture: {
    type: String, // Data type is String
    trim: true, // Remove white spaces from both ends
  },
  gstin: {
    type: String, // Data type is String to accommodate alphanumeric GSTIN
    trim: true, // Remove white spaces from both ends
  },
});

// Export the Admin model based on the adminSchema
module.exports = mongoose.model('Admin', adminSchema);
