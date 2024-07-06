const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 32,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  product: {
    type: Array,
    default: [],
  },
  image: Buffer,
  gstin: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Admin', adminSchema);
