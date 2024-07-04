var express = require('express');
var router = express.Router();
const adminModel = require('../models/admin-model');

// Creating Owner after checking that previous owner existence
if (process.env.NODE_ENV === 'development') {
  router.post('/create', async function(req, res) {    
      let admin = await adminModel.find();
      if (admin.length > 0) {
        return res.status(503).send('You do not have permission to create account');
      }

      let { fullName, email, password } = req.body;

      let createAdmin = await adminModel.create({
        fullName,
        email,
        password        
      })
      res.status(201).send(createAdmin);
});
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('This is Admin');
});

module.exports = router;
