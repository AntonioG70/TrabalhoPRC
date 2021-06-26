var express = require('express');
var router = express.Router();
var graphdb = require('../utils/graphdb')
var Class = require('../controllers/classifications')

router.get('/:id', function(req, res){
    Class.getClassifications(req.params.id)
        .then(dados => {
            let classifications = dados.data.results.bindings
            list = []
            classifications = classifications.map(elem => {
                return elem.a.value.split('#')[1]
            })
            let x = (classifications) => classifications.filter((v,i) => classifications.indexOf(v) === i)
            res.status(200).jsonp(x(classifications))
        })
        .catch(err => res.status(500).jsonp(err))    
})

module.exports = router;