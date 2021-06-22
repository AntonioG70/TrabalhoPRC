var express = require('express');
var router = express.Router();
var graphdb = require('../utils/graphdb')
var Animals = require('../controllers/animals')

/* GET home page. */
router.get('/', async function(req, res, next) {
    let type = req.query.type
    let location = req.query.location

    Animals.getAnimals(type, location)
        .then(dados => {
            let animals = dados.data.results.bindings
            animals = animals.map(elem => {
                return graphdb.pair2Value(elem.a)
            })
            res.status(200).jsonp(animals)
        })
        .catch(err => res.status(500).jsonp(err))   
})

router.get('/:animal', function(req, res){
    Animals.getAnimalInfo(req.params.animal)
        .then(dados => {
            let animals = dados.data.results.bindings
            animals = animals.map(elem => { return {
            p: graphdb.pair2Value(elem.p),
            o: graphdb.pair2Value(elem.o)
            }})
            res.status(200).jsonp(animals)
        })
        .catch(err => res.status(500).jsonp(err))  
})



module.exports = router;
