const jwt = require('jsonwebtoken');
const adminModel = require('../models/admin-model');
const userModel = require('../models/user-model');

module.exports = async function(req, res, next) {
  // Check if the token is present in the cookies
  if (!req.cookies.token) {
    req.flash("error", "You need to login first");
    return res.redirect("/login"); // Redirect to the login page if no token is found
  }

  try {
    // Verify the token using the secret key
    let decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);

    console.log("Decoded token:", decoded); // Log decoded token

    // Check if the token identifies an admin or a user
    let admin = await adminModel.findOne({ email: decoded.email });
    let user = await userModel.findOne({ email: decoded.email });

    console.log("Admin found:", admin); // Log admin object
    console.log("User found:", user); // Log user object

    // If neither admin nor user is found, redirect to the login page with an error message
    if (!admin && !user) {
      req.flash("error", "User not found");
      return res.redirect("/login");
    }

    // Attach either admin or user to the request object based on who is found
    if (admin) {
      req.admin = admin;
    } else {
      req.user = user;
    }

    next(); // Call the next middleware function
  } catch (err) {
    // If there's an error (e.g., token verification failed), redirect with an error message
    console.error("Authentication error:", err);
    req.flash("error", "Authentication failed");
    res.redirect("/login");
  }
};
