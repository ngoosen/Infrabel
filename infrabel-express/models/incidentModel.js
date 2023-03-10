const dbConnect = require('./db').connect()

const IncidentModel = {
    getAll: () => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT i.id_incident, " +
            "i.nb_min_retard AS retard_minutes, " +
            "i.nb_train_supp AS nb_trains_supp, " +
            "l.fr_lieu AS lieu, " +
            "it.fr_incident_type AS type_incident, " +
            "d.id_date AS date_incident, " +
            "li.id_ligne AS ligne " +
        "FROM incidents i " +
            "JOIN lieu l ON i.FK_lieu = l.id_lieu " +
            "JOIN incident_type it ON i.FK_incident_type = it.id_incident_type " +
            "JOIN dates d ON i.FK_incident_date = d.id_date " +
            "JOIN ligne li ON i.FK_ligne_incident = li.id_ligne " +
            "ORDER BY d.id_date")
        })
    },
    getById: (id) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT i.id_incident, " +
            "i.nb_min_retard AS retard_minutes, " +
            "i.nb_train_supp AS nb_trains_supp, " +
            "l.fr_lieu AS lieu, " +
            "it.fr_incident_type AS type_incident, " +
            "d.id_date AS date_incident, " +
            "li.id_ligne AS ligne " +
        "FROM incidents i " +
            "JOIN lieu l ON i.FK_lieu = l.id_lieu " +
            "JOIN incident_type it ON i.FK_incident_type = it.id_incident_type " +
            "JOIN dates d ON i.FK_incident_date = d.id_date " +
            "JOIN ligne li ON i.FK_ligne_incident = li.id_ligne " +
            "WHERE i.id_incident = " + id)
        })
    },
    getByPlace: (place) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT i.id_incident, " +
            "i.nb_min_retard AS retard_minutes, " +
            "i.nb_train_supp AS nb_trains_supp, " +
            "l.fr_lieu AS lieu, " +
            "it.fr_incident_type AS type_incident, " +
            "d.id_date AS date_incident, " +
            "li.id_ligne AS ligne " +
        "FROM incidents i " +
            "JOIN lieu l ON i.FK_lieu = l.id_lieu " +
            "JOIN incident_type it ON i.FK_incident_type = it.id_incident_type " +
            "JOIN dates d ON i.FK_incident_date = d.id_date " +
            "JOIN ligne li ON i.FK_ligne_incident = li.id_ligne " +
            "WHERE l.fr_lieu = '" + place + "' OR l.nl_lieu = '" + place + "' OR l.en_lieu = '" + place + "'" + 
            "ORDER BY d.id_date")
        })
    }
}

module.exports = IncidentModel