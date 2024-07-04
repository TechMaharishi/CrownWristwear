const mongoose = require('mongoose');


// Define the User schema
const userSchema = new mongoose.Schema({
  fullName: {
    type: String, // Data type is string
    required: true, // Full name is required
    minlength: 3, // Minimum length should be 3 characters
    maxlength: 32, // Maximum length should be 32 characters
    trim: true, // Remove white spaces from both ends
  },
  email: {
    type: String, // Data type is string
    required: true, // E-mail is required
    trim: true, // Remove white spaces from both ends
    unique: true, // E-mail must be unique
  },
  password: {
    type: String, // Data type is string
    required: true, // Password is required
  },
  cart: {
    type: Array, // Data type is array
    default: [], // Default value is empty
  },
  order: {
    type: Array, // Data type is array
    default: [], // Default value is empty
  },
  contact: {
    type: String, // Data type is string
    trim: true, // Remove white spaces from both ends
    minlength: 10, // Minimum length must be 10
    maxlength: 10 // Maximum length must be 10
  },
  address: {
    type: String, // Data type is string
    trim: true, // Remove white spaces from both ends
  },
  picture: { 
    type: String, // Data type is string
    trim: true, // Remove white spaces from both ends
  }
});

// Export the User model based on the userSchema
module.exports = mongoose.model('User', userSchema);
