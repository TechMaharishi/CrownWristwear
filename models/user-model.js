const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products"
  }],
  order: {
    type: Array,
    default: [],
  },
  contact: {
    type: String,
    trim: true,
    minlength: 10,
    maxlength: 10
  },
  address: {
    type: String,
    trim: true,
  },
  image: Buffer,
});

module.exports = mongoose.model('User', userSchema);
