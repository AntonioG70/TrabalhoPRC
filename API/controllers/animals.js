var graphdb = require('../utils/graphdb')

module.exports.getAnimals = (type,location) => {
    let linetype = ""
    let linelocation = ""
    if (type)
        linetype = 'rdf:type :' + type + ' ;\n'
    if (location)
        linelocation = ':livesIn :' + location + ' ;\n'

    let query = `SELECT ?a WHERE {
                ?a rdf:type :Animal ;
                ` + linetype + `
                ` + linelocation + `
            }`

    return graphdb.execQuery(query)
              
}   

module.exports.getLocations = () => {
    let query = `SELECT ?l WHERE {
        ?l rdf:type :Location.
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

module.exports.getTypes = () => {
    let query = `SELECT ?t WHERE {
        ?t rdfs:subClassOf :Animal.
    }`

    return graphdb.execQuery(query)
}





