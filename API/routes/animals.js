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
    let kingdom = req.query.kingdom
    let genus = req.query.genus
    let family = req.query.family
    let order = req.query.order
    let phylum = req.query.phylum

    Animals.getAnimals(type, location, kingdom, genus, family, order, phylum)
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
            
            let animalInfo = {}
            for(var key in animals) {
                var data = animals[key];
                if(data.p in animalInfo){
                    if(Array.isArray(animalInfo[data.p])){
                        animalInfo[data.p].push(data.o)
                    }
                    else {
                        array = []
                        array.push(animalInfo[data.p])
                        array.push(data.o)
                        animalInfo[data.p] = array
                    }
                }
                else {
                    animalInfo[data.p] = data.o
                }
            }
            res.status(200).jsonp(animalInfo)
        })
        .catch(err => res.status(500).jsonp(err))  
})

module.exports = router;
