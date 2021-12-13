var express = require('express');
var router = express.Router();

const userController = require('../controllers').user;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
