const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: Buffer,
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  bgColor: {
    type: String,
    required: true,
    trim: true,
  },
  textColor: {
    type: String,
    required: true,
    trim: true,
  },
  panelColor: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('Products', productSchema);
