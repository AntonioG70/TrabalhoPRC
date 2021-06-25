var graphdb = require('../utils/graphdb-users')

module.exports.getUser = (username) => {

    let query = `SELECT ?p WHERE {
                :${username} rdf:type :Users .
                :${username} :password ?p
            }`

    return graphdb.execQuery(query)
              
}

module.exports.addUser = (username, password) => {

    let query = `INSERT DATA {
                :${username} rdf:type :Users .
                :${username} rdf:type owl:NamedIndividual .
                :${username} :password "${password}" .
            }`

    return graphdb.execTransaction(query)
              
}   