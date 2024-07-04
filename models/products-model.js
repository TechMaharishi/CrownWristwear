const mongoose = require('mongoose');

// Define the Product schema
const productSchema = new mongoose.Schema({
  image: {
    type: String, // Data type is String
    trim: true,   // Remove white spaces from both ends
  },
  name: {
    type: String, // Data type is String
    required: true, // Name is required
    trim: true, // Remove white spaces from both ends
  },
  price: {
    type: Number, // Data type is Number
    required: true, // Price is required
  },
  discount: {
    type: Number, // Data type is Number
    default: 0, // Default value is 0
  }, 
  bgColor: {
    type: String, // Data type is String
    required: true, // Background color is required
    trim: true, // Remove white spaces from both ends
  },
  textColor: {
    type: String, // Data type is String
    required: true, // Text color is required
    trim: true, // Remove white spaces from both ends
  },
  panelColor: {
    type: String, // Data type is String
    required: true, // Panel color is required
    trim: true, // Remove white spaces from both ends
  },
});

// Export the Product model based on the productSchema
module.exports = mongoose.model('Products', productSchema);
