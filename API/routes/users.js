var express = require('express');
var router = express.Router();
var graphdb = require('../utils/graphdb-users')
var User = require('../controllers/users')

var passport = require('passport')

router.post('/login', passport.authenticate('local'), function(req, res){
    //res.status(201).jsonp(req.user) not sure if this works é testar
    res.status(201).jsonp()
  })

router.post('/register', function(req,res) {
    //User.inserir(req.body)
        //.then(dados => res.status(201).jsonp({user: dados}))
        //.catch(err => res.status(500).jsonp({err: err}))
})

module.exports = router;
