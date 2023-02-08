const dbConnect = require('./db').connect()

const IncidentModel = {
    getAll: () => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT i.id_incident, " +
            "i.nb_min_retard AS [Retard en secondes], " +
            "i.nb_train_supp AS [Nombre de trains supprimés], " +
            "l.fr_lieu AS Lieu, " +
            "it.fr_incident_type AS [Type d'incident], " +
            "d.id_date AS [Date de l'incident], " +
            "li.id_ligne AS Ligne " +
        "FROM incidents i " +
            "JOIN lieu l ON i.FK_lieu = l.id_lieu " +
            "JOIN incident_type it ON i.FK_incident_type = it.id_incident_type " +
            "JOIN dates d ON i.FK_incident_date = d.id_date " +
            "JOIN ligne li ON i.FK_ligne_incident = li.id_ligne")
        })
    },
    getById: (id) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT i.id_incident, " +
            "i.nb_min_retard AS [Retard en secondes], " +
            "i.nb_train_supp AS [Nombre de trains supprimés], " +
            "l.fr_lieu AS Lieu, " +
            "it.fr_incident_type AS [Type d'incident], " +
            "d.id_date AS [Date de l'incident], " +
            "li.id_ligne AS Ligne " +
        "FROM incidents i " +
            "JOIN lieu l ON i.FK_lieu = l.id_lieu " +
            "JOIN incident_type it ON i.FK_incident_type = it.id_incident_type " +
            "JOIN dates d ON i.FK_incident_date = d.id_date " +
            "JOIN ligne li ON i.FK_ligne_incident = li.id_ligne " +
            "WHERE i.id_incident = " + id)
        })
    }
}

module.exports = IncidentModel