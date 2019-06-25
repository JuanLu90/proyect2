var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', function(req, res, next) {
  res.render('users');
});

router.get('/users/:id', function(req, res, next) {
  res.render('userProfile');
})

router.get('/newUser', function(req, res, next) {
  res.render('newUser');
});

router.get('/editUser/:id', function(req, res, next) {
  res.render('editUser');
})

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
