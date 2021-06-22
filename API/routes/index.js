var express = require('express');
var router = express.Router();
var graphdb = require('../utils/graphdb')

/* GET home page. */
router.get('/animals', function(req, res, next) {
    let query = `SELECT ?a WHERE {
                    ?a rdf:type :Animal .
                }`

    graphdb.execQuery(query)
        .then(dados => {
            let pubs = dados.data.results.bindings
            pubs = pubs.map(elem => {
                return graphdb.pair2Value(elem.a)
            })
            res.send(pubs)
        })
        .catch(error => {
            res.send(error)
        })
});

module.exports = router;
