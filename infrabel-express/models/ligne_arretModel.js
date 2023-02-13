const dbConnect = require('./db').connect()

const LigneArretModel = {
    getAll: () => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT a.nom_arret AS arret, " +
                "l.id_ligne AS ligne " +
            "FROM ligne_arret la " +
                "JOIN arret a ON la.FK_id_arret = a.id_arret " +
                "JOIN ligne l ON la.FK_id_ligne = l.id_ligne")
        })
    },
    getByLigneID: async (id) => {
        const conn = await dbConnect
        return conn.query("SELECT a.nom_arret AS arret, " +
            "l.id_ligne AS ligne " +
            "FROM ligne_arret la " +
            "JOIN arret a ON la.FK_id_arret = a.id_arret " +
            "JOIN ligne l ON la.FK_id_ligne = l.id_ligne " +
            "WHERE l.id_ligne = '" + id + "'")
    },
    getByArretID: (id) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT a.nom_arret AS [Arrêt], " +
                "l.id_ligne AS Ligne " +
            "FROM ligne_arret la " +
                "JOIN arret a ON la.FK_id_arret = a.id_arret " +
                "JOIN ligne l ON la.FK_id_ligne = l.id_ligne " +
                "WHERE a.id_arret = " + id)
        })
    }
}
module.exports = LigneArretModel