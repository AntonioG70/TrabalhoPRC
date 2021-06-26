var graphdb = require('../utils/graphdb')

module.exports.getClassifications = (id) => {

    let query = `SELECT ?a WHERE {
                ?a rdf:type :${id} .
                ?s :hasClassification ?a.
            }`

    return graphdb.execQuery(query)
              
}
