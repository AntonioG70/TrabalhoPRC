var express = require('express');
var router = express.Router();
var graphdb = require('../utils/graphdb')
var Animals = require('../controllers/animals')

/* GET home page. */
router.get('/', async function(req, res, next) {
    if(req.query.type && req.query.location){
        Animals.getAnimalTypeLocation(req.query.type, req.query.location)
            .then(dados => {
                let animals = dados.data.results.bindings
                animals = animals.map(elem => {
                return graphdb.pair2Value(elem.a)
                })
                res.status(200).jsonp(animals)
            })
            .catch(err => res.status(500).jsonp(err))
    }
    else if(req.query.type){
        Animals.getAnimalsType(req.query.type)
            .then(dados => {
                let animals = dados.data.results.bindings
                animals = animals.map(elem => {
                return graphdb.pair2Value(elem.a)
                })
                res.status(200).jsonp(animals)
            })
            .catch(err => res.status(500).jsonp(err))
    }
    else if (req.query.location){
        Animals.getAnimalLocation(req.query.location)
            .then(dados => {
                let animals = dados.data.results.bindings
                animals = animals.map(elem => {
                return graphdb.pair2Value(elem.a)
                })
                res.status(200).jsonp(animals)
            })
            .catch(err => res.status(500).jsonp(err))
    }
    else{
        Animals.getAnimals()
            .then(dados => {
                let animals = dados.data.results.bindings
                animals = animals.map(elem => {
                return graphdb.pair2Value(elem.a)
                })
                res.status(200).jsonp(animals)
            })
            .catch(err => res.status(500).jsonp(err))  
    }    
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
