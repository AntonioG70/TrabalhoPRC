var graphdb = require('../utils/graphdb')

module.exports.getAnimals = () => {
    let query = `SELECT ?a WHERE {
                ?a rdf:type :Animal ;
            }`

    return graphdb.execQuery(query)
              
}   

module.exports.getAnimalsType = (type) => {
    linetype = 'rdf:type :' + type + ' ;\n'

    let query = `SELECT ?a WHERE {
                ?a rdf:type :Animal ;
                ` + linetype + `
            }`

    return graphdb.execQuery(query)
                
}

module.exports.getAnimalInfo = (animal) => {

    let query = `SELECT * WHERE {
                :` + animal + ` ?p ?o ;
            }`

    return graphdb.execQuery(query)
                
}

module.exports.getAnimalLocation = (loc) => {

    let query = `SELECT ?a WHERE {
        ?a rdf:type :Animal ;
            :livesIn :` + loc + `
    }`

    return graphdb.execQuery(query)
                
}

module.exports.getAnimalTypeLocation = (type, loc) => {
    let query = `SELECT ?a WHERE {
        ?a rdf:type :Animal ;
            rdf:type :` + type + `; 
            :livesIn :` + loc + `
    }`
    
    return graphdb.execQuery(query)
}




