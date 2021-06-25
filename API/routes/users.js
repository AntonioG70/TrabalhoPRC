var express = require('express');
var router = express.Router();
var graphdb = require('../utils/graphdb-users')
var User = require('../controllers/users')

var passport = require('passport')

router.post('/login', passport.authenticate('local'), function(req, res){
    res.status(201).jsonp(req.user)
  })

router.get('/logout', function(req,res) {
  req.logout();
  req.session.destroy(function (err) {
    if (!err) {
      res.status(200).jsonp('destroyed');
    } else {
      console.log('Destroy session error: ', err)
    }
  });
})

router.post('/register', function(req,res) {
    User.addUser(req.body.id,req.body.password)
        .then(dados => res.status(201).jsonp({user: dados}))
        .catch(err => res.status(500).jsonp({err: err}))
})

module.exports = router;
