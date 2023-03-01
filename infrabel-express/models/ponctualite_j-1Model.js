const dbConnect = require('./db').connect()

const PonctualiteJModel = {
    getAll: () => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT t.id_trajet, " +
            "CAST(t.h_arrivee_reel AS TIME) AS arr_reel, " +
            "t.h_arrivee_prevu AS arr_prev, " +
            "t.h_depart_reel AS dep_reel, " +
            "t.h_depart_prevu AS dep_prev, " +
            "t.retard_arrivee AS retard_arr, " +
            "t.retard_depart AS retard_dep, " +
            "r.code_relation + ': ' + " +
                "(SELECT ar.nom_arret " + 
                "FROM arret ar " +
                "WHERE ar.id_arret = r.FK_gare_1) + ' - ' + " +
                "(SELECT ar.nom_arret " +
                "FROM arret ar " +
                "WHERE ar.id_arret = r.FK_gare_2) AS relation, " +
            "l1.id_ligne AS ligne_dep, " +
            "l2.id_ligne AS ligne_arr, " +
            "nt.num_train AS num_train, " +
            "a.nom_arret AS arret, " +
            "d.id_date AS [date] " +
        "FROM trajet_J_1 t " +
            "JOIN relation r ON t.FK_relation_trajet = r.id_relation " +
            "JOIN ligne l1 ON t.FK_ligne_depart = l1.id_ligne " +
            "JOIN ligne l2 ON t.FK_ligne_arrivee = l2.id_ligne " +
            "JOIN numero_train nt ON t.FK_num_train = nt.id_num_train " +
            "JOIN arret a ON t.FK_arret = a.id_arret " +
            "JOIN dates d ON d.id_date = t.FK_date")
        })
    },
    getByID: (id) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT t.id_trajet, " +
            "CAST(t.h_arrivee_reel AS TIME) AS arr_reel, " +
            "t.h_arrivee_prevu AS arr_prev, " +
            "t.h_depart_reel AS dep_reel, " +
            "t.h_depart_prevu AS dep_prev, " +
            "t.retard_arrivee AS retard_arr, " +
            "t.retard_depart AS retard_dep, " +
            "r.code_relation + ': ' + " +
                "(SELECT ar.nom_arret " + 
                "FROM arret ar " +
                "WHERE ar.id_arret = r.FK_gare_1) + ' - ' + " +
                "(SELECT ar.nom_arret " +
                "FROM arret ar " +
                "WHERE ar.id_arret = r.FK_gare_2) AS relation, " +
            "l1.id_ligne AS ligne_dep, " +
            "l2.id_ligne AS ligne_arr, " +
            "nt.num_train AS num_train, " +
            "a.nom_arret AS arret, " +
            "d.id_date AS [date] " +
        "FROM trajet_J_1 t " +
            "JOIN relation r ON t.FK_relation_trajet = r.id_relation " +
            "JOIN ligne l1 ON t.FK_ligne_depart = l1.id_ligne " +
            "JOIN ligne l2 ON t.FK_ligne_arrivee = l2.id_ligne " +
            "JOIN numero_train nt ON t.FK_num_train = nt.id_num_train " +
            "JOIN arret a ON t.FK_arret = a.id_arret " +
            "JOIN dates d ON d.id_date = t.FK_date " +
        "WHERE t.id_trajet = " + id)
        })
    },
    getByStop: (stop) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT t.id_trajet, " +
            "CAST(t.h_arrivee_reel AS TIME) AS arr_reel, " +
            "t.h_arrivee_prevu AS arr_prev, " +
            "t.h_depart_reel AS dep_reel, " +
            "t.h_depart_prevu AS dep_prev, " +
            "t.retard_arrivee AS retard_arr, " +
            "t.retard_depart AS retard_dep, " +
            "r.code_relation + ': ' + " +
                "(SELECT ar.nom_arret " + 
                "FROM arret ar " +
                "WHERE ar.id_arret = r.FK_gare_1) + ' - ' + " +
                "(SELECT ar.nom_arret " +
                "FROM arret ar " +
                "WHERE ar.id_arret = r.FK_gare_2) AS relation, " +
            "l1.id_ligne AS ligne_dep, " +
            "l2.id_ligne AS ligne_arr, " +
            "nt.num_train AS num_train, " +
            "a.nom_arret AS arret, " +
            "d.id_date AS [date] " +
        "FROM trajet_J_1 t " +
            "JOIN relation r ON t.FK_relation_trajet = r.id_relation " +
            "JOIN ligne l1 ON t.FK_ligne_depart = l1.id_ligne " +
            "JOIN ligne l2 ON t.FK_ligne_arrivee = l2.id_ligne " +
            "JOIN numero_train nt ON t.FK_num_train = nt.id_num_train " +
            "JOIN arret a ON t.FK_arret = a.id_arret " +
            "JOIN dates d ON d.id_date = t.FK_date " +
        "WHERE a.nom_arret = '" + stop + "'")
        })
    },
    getAverageByStop: (stop) => {
        return dbConnect.then((conn) => {
            return conn.query(
                "SELECT AVG(t.retard_arrivee) AS moyenne_arrivee, " +
                    "AVG(t.retard_depart) AS moyenne_depart " +
                "FROM trajet_J_1 t " +
                "JOIN arret a ON t.FK_arret = a.id_arret " +
                "WHERE a.nom_arret = '" + stop + "'"
            )
        })
    }
}

module.exports = PonctualiteJModel