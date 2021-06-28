var graphdb = require('../utils/graphdb')

module.exports.getAnimals = (type, location, classification) => {
    let { general, kingdom, genus, family, order, phylum, classe } = classification
    let linetype = ""
    let linelocation = ""
    let linekingdom = ""
    let linegenus = ""
    let linefamily = ""
    let lineorder = ""
    let linephylum = ""
    let lineclasse = ""
    let linegeneral = ""

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
    if (classe)
        lineclasse = ':hasClasse :' + classe + ' ;\n'
    if (general)
        linegeneral = ':hasClassification :' + general + ' ;\n'

    let query = `SELECT ?a ?img WHERE {
                ?a rdf:type :Animal ;
                ` + linetype + `
                ` + linelocation + `
                ` + linekingdom + `
                ` + linegenus + `
                ` + linefamily + `
                ` + lineorder + `
                ` + linephylum + `
                ` + lineclasse + `
                ` + linegeneral + `
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

    let query = `DELETE {:${animal} :${type} ?e .}
                INSERT {:${animal} :${type} "${edit}" .
                }
                WHERE  { 
                        :${animal} :${type} ?e .
                        :${animal} rdf:type :Animal . 
    }`

    return graphdb.execTransaction(query)
                
}

module.exports.deleteAnimal = (animal) => {

    let query = `DELETE {:${animal} ?p ?o .
                        ?p1 ?o1 :${animal}.
                    }
                WHERE  { 
                        :${animal} ?p ?o . 
                        ?p1 ?o1 :${animal}. 
    }`

    return graphdb.execTransaction(query)
                
}




