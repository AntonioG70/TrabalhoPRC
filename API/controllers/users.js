var graphdb = require('../utils/graphdb-users')

module.exports.getUser = (username) => {

    let query = `SELECT ?p WHERE {
                :${username} rdf:type :Users .
                :${username} :password ?p
            }`

    return graphdb.execQuery(query)
              
}   