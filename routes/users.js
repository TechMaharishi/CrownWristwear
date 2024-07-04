var express = require('express');
var router = express.Router();

const {registerUser, loginUser} = require('../controllers/authController')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Post route to register 
router.post('/register', registerUser);

//Post route to login
router.post('/login', loginUser);

module.exports = router;
