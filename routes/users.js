var express = require('express');
var router = express.Router();

const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

module.exports = router;
