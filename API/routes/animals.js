var express = require('express');
var router = express.Router();
var graphdb = require('../utils/graphdb')
var Animals = require('../controllers/animals')

router.get('/locations', function(req, res){
    Animals.getLocations()
        .then(dados => {
            let locations = dados.data.results.bindings
            locations = locations.map(elem => {
                return graphdb.pair2Value(elem.l)
            })
            res.status(200).jsonp(locations)
        })
        .catch(err => res.status(500).jsonp(err))    
})

router.get('/types', function(req, res){
    Animals.getTypes()
        .then(dados => {
            let types = dados.data.results.bindings
            types = types.map(elem => {
                return graphdb.pair2Value(elem.t)
            })
            res.status(200).jsonp(types)
        })
        .catch(err => res.status(500).jsonp(err))    
})

router.get('/', async function(req, res, next) {
    let type = req.query.type
    let location = req.query.location
    if(req.isAuthenticated) console.log('hello FRINED')

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
