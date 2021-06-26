var graphdb = require('../utils/graphdb')

module.exports.getAnimals = (type, location, kingdom, genus, family, order, phylum) => {
    let linetype = ""
    let linelocation = ""
    let linekingdom = ""
    let linegenus = ""
    let linefamily = ""
    let lineorder = ""
    let linephylum = ""

    if (type)
        linetype = 'rdf:type :' + type + ' ;\n'
    if (location)
        linelocation = ':livesIn :' + location + ' ;\n'
    if (kingdom)
        linekingdom = ':hasKingdom :' + kingdom + ' ;\n'      
    if (genus)
        linegenus = ':hasGenus :' + genus + ' ;\n'
    if (family)
        linefamily = ':hasFamily :' + family + ' ;\n'   
    if (order)
        lineorder = ':hasOrder :' + order + ' ;\n' 
    if (phylum)
        linephylum = ':hasPhylum :' + phylum + ' ;\n'

    let query = `SELECT ?a ?img WHERE {
                ?a rdf:type :Animal ;
                ` + linetype + `
                ` + linelocation + `
                ` + linekingdom + `
                ` + linegenus + `
                ` + linefamily + `
                ` + lineorder + `
                ` + linephylum + `
                :image ?img.
            }`

    return graphdb.execQuery(query)
              
}   

module.exports.getLocations = () => {
    let query = `SELECT ?l WHERE {
        ?l rdf:type :Location.
    }`

    return graphdb.execQuery(query)
} 

module.exports.getAnimalInfo = (animal) => {

    let query = `SELECT * WHERE {
                :` + animal + ` ?p ?o .
                FILTER (?o != owl:NamedIndividual)
            }`

    return graphdb.execQuery(query)
                
}

module.exports.getTypes = () => {
    let query = `SELECT ?t WHERE {
        ?t rdfs:subClassOf :Animal.
    }`

    return graphdb.execQuery(query)
}

module.exports.editAnimal = (animal,type,edit) => {

    let query = `DELETE {:${animal} :${type} ?e}
                INSERT {:${animal} :${type} ${edit} .
                }
                WHERE  { 
                        :${animal} :${type} ?e
                        :${animal} rdf:type :Animal . 
    }`

    return graphdb.execQuery(query)
                
}





