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
    let classification = {}
    let type = req.query.type
    let location = req.query.location
    classification["kingdom"] = req.query.Kingdom
    classification["genus"] = req.query.Genus
    classification["classe"] = req.query.Classe
    classification["family"] = req.query.Family
    classification["order"] = req.query.Order
    classification["phylum"] = req.query.Phylum
    classification["general"] = req.query.classification

    Animals.getAnimals(type, location, classification)
        .then(dados => {
            let animals = dados.data.results.bindings
            animals = animals.map(elem => {
                return {
                    name: graphdb.pair2Value(elem.a),
                    img: graphdb.pair2Value(elem.img)
                }
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
                        let array = []
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

router.put('/:animal', function(req, res){
    Animals.editAnimal(req.params.animal, req.body.type, req.body.edit)
        .then(dados => {
            res.status(200).jsonp('Changed!')
        })
        .catch(err => res.status(500).jsonp(err))    
})

router.delete('/:animal', function(req, res){
    Animals.deleteAnimal(req.params.animal)
        .then(dados => {
            res.status(200).jsonp('Deleted!')
        })
        .catch(err => res.status(500).jsonp(err))    
})

module.exports = router;
