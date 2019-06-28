var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('login');
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

// ******** BOOKS **********

router.get('/books', function(req, res, next) {
  res.render('books');
});

router.get('/newBook', function(req, res, next) {
  res.render('newBook');
});

router.get('/books/:id', function(req, res, next) {
  res.render('bookProfile');
})

router.get('/editBook/:id', function(req, res, next) {
  res.render('editBook');
});





module.exports = router;
