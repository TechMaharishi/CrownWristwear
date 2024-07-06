const jwt = require('jsonwebtoken');
const adminModel = require('../models/admin-model');
const userModel = require('../models/user-model');

module.exports = async function(req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "You need to login first");
    return res.redirect("/login");
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);

    console.log("Decoded token:", decoded);

    let admin = await adminModel.findOne({ email: decoded.email });
    let user = await userModel.findOne({ email: decoded.email });

    console.log("Admin found:", admin);
    console.log("User found:", user);

    if (!admin && !user) {
      req.flash("error", "User not found");
      return res.redirect("/login");
    }

    if (admin) {
      req.admin = admin;
    } else {
      req.user = user;
    }

    next();
  } catch (err) {
    console.error("Authentication error:", err);
    req.flash("error", "Authentication failed");
    res.redirect("/login");
  }
};
