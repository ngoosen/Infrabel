const dbConnect = require('./db').connect()

const PonctualiteMomentModel = {
    getAll: () => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT p.id_ponctualite_IC_moment, " +
                "p.ponctualite_pourcentage, " +
                "p.nb_train_inferieur_6_min, " +
                "p.min_de_retard, " +
                "d.id_date AS date, " + 
                "a.nom_arret AS destination, " + 
                "i.fr_instant AS instant, " + 
                "r.code_relation + ': ' + " +
                "(SELECT arr.nom_arret " +
                    "FROM arret arr " +
                    "WHERE r.FK_gare_1 = arr.id_arret) + ' - ' + " +
                "(SELECT ar.nom_arret " +
                    "FROM arret ar " +
                    "WHERE r.FK_gare_2 = ar.id_arret) AS relation " +
            "FROM ponctualite_IC_moment p " +
                "JOIN dates d ON p.FK_date_ponctualite_IC_moment = d.id_date " +
                "JOIN arret a ON p.FK_destination = a.id_arret " +
                "JOIN instant i ON p.FK_moment_journee = i.id_instant " +
                "JOIN relation r ON p.FK_relation_ponctualite_IC_moment = r.id_relation")
        })
    },
    getById: (id) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT p.id_ponctualite_IC_moment, " +
                "p.ponctualite_pourcentage, " +
                "p.nb_train_inferieur_6_min, " +
                "p.min_de_retard, " +
                "d.id_date AS date, " + 
                "a.nom_arret AS destination, " + 
                "i.fr_instant AS instant, " + 
                "r.code_relation + ': ' + " +
                "(SELECT arr.nom_arret " +
                    "FROM arret arr " +
                    "WHERE r.FK_gare_1 = arr.id_arret) + ' - ' + " +
                "(SELECT ar.nom_arret " +
                    "FROM arret ar " +
                    "WHERE r.FK_gare_2 = ar.id_arret) AS relation " +
            "FROM ponctualite_IC_moment p " +
                "JOIN dates d ON p.FK_date_ponctualite_IC_moment = d.id_date " +
                "JOIN arret a ON p.FK_destination = a.id_arret " +
                "JOIN instant i ON p.FK_moment_journee = i.id_instant " +
                "JOIN relation r ON p.FK_relation_ponctualite_IC_moment = r.id_relation " +
                "WHERE p.id_ponctualite_IC_moment = " + id)
        })
    },
    getByStop: (stop) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT p.id_ponctualite_IC_moment, " +
            "p.ponctualite_pourcentage, " +
            "p.nb_train_inferieur_6_min, " +
            "p.min_de_retard, " +
            "d.id_date AS date, " + 
            "a.nom_arret AS destination, " + 
            "i.fr_instant AS instant, " + 
            "r.code_relation + ': ' + " +
            "(SELECT arr.nom_arret " +
                "FROM arret arr " +
                "WHERE r.FK_gare_1 = arr.id_arret) + ' - ' + " +
            "(SELECT ar.nom_arret " +
                "FROM arret ar " +
                "WHERE r.FK_gare_2 = ar.id_arret) AS relation " +
        "FROM ponctualite_IC_moment p " +
            "JOIN dates d ON p.FK_date_ponctualite_IC_moment = d.id_date " +
            "JOIN arret a ON p.FK_destination = a.id_arret " +
            "JOIN instant i ON p.FK_moment_journee = i.id_instant " +
            "JOIN relation r ON p.FK_relation_ponctualite_IC_moment = r.id_relation " +
        "WHERE  (SELECT arr.nom_arret " +
                    "FROM arret arr " +
                    "WHERE r.FK_gare_1 = arr.id_arret) = '" + stop + "' OR " +
                "(SELECT ar.nom_arret " +
                    "FROM arret ar " +
                    "WHERE r.FK_gare_2 = ar.id_arret) = '" + stop + "'")
        })
    },
    getByStopInstant: (params) => {
        let instant = ""
        switch(params.instant){
            case "soir" : instant = "Pointe du soir"
            break
            case "matin" : instant = "Pointe du matin"
            break
            case "weekends" : instant = "Weekends"
            break
            default : instant = "Heures creuses"
            break
        }
        return dbConnect.then((conn) => {
            return conn.query("SELECT p.id_ponctualite_IC_moment, " +
            "p.ponctualite_pourcentage, " +
            "p.nb_train_inferieur_6_min, " +
            "p.min_de_retard, " +
            "d.id_date AS date, " + 
            "a.nom_arret AS destination, " + 
            "i.fr_instant AS instant, " + 
            "r.code_relation + ': ' + " +
            "(SELECT arr.nom_arret " +
                "FROM arret arr " +
                "WHERE r.FK_gare_1 = arr.id_arret) + ' - ' + " +
            "(SELECT ar.nom_arret " +
                "FROM arret ar " +
                "WHERE r.FK_gare_2 = ar.id_arret) AS relation " +
        "FROM ponctualite_IC_moment p " +
            "JOIN dates d ON p.FK_date_ponctualite_IC_moment = d.id_date " +
            "JOIN arret a ON p.FK_destination = a.id_arret " +
            "JOIN instant i ON p.FK_moment_journee = i.id_instant " +
            "JOIN relation r ON p.FK_relation_ponctualite_IC_moment = r.id_relation " +
        "WHERE  ((SELECT arr.nom_arret " +
                    "FROM arret arr " +
                    "WHERE r.FK_gare_1 = arr.id_arret) = '" + params.stop + "' OR " +
                "(SELECT ar.nom_arret " +
                    "FROM arret ar " +
                    "WHERE r.FK_gare_2 = ar.id_arret) = '" + params.stop + "') AND " +
                "FK_moment_journee = (SELECT ins.id_instant " +
                    "FROM instant ins " +
                    "WHERE ins.fr_instant = '" + instant + "')")
        })
    }
}
module.exports = PonctualiteMomentModel