const dbConnect = require('./db').connect()

const RelationModel = {
    getAll: () => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT r.id_relation, " +
            "r.code_relation AS code_relation, " +
            "gare1.nom_arret AS gare1, " +
            "gare2.nom_arret AS gare2 " +
        "FROM relation r " +
            "JOIN arret gare1 ON r.FK_gare_1 = gare1.id_arret " +
            "JOIN arret gare2 ON r.FK_gare_2 = gare2.id_arret")
        })
    },
    getById: (id) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT r.id_relation, " +
            "r.code_relation AS code_relation, " +
            "gare1.nom_arret AS gare1, " +
            "gare2.nom_arret AS gare2 " +
        "FROM relation r " +
            "JOIN arret gare1 ON r.FK_gare_1 = gare1.id_arret " +
            "JOIN arret gare2 ON r.FK_gare_2 = gare2.id_arret " +
            "WHERE r.id_relation = " + id)
        })
    }
}
module.exports = RelationModel