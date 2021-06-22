var graphdb = require('../utils/graphdb-users')

module.exports.getUsers = (username) => {

    let query = `SELECT ?a WHERE {
                ?a rdf:type :User .
                ?a :username :${username}
            }`

    return graphdb.execQuery(query)
              
}   