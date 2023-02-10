const dbConnect = require('./db').connect()

const PonctualiteJModel = {
    getAll: () => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT t.id_trajet, " +
            "CAST(t.h_arrivee_reel AS TIME) AS [Arrivée réelle], " +
            "t.h_arrivee_prevu AS [Arrivée prévue], " +
            "t.h_depart_reel AS [Départ réel], " +
            "t.h_depart_prevu AS [Départ prévu], " +
            "t.retard_arrivee AS [Retard à l'arrivée], " +
            "t.retard_depart AS [Retard au départ], " +
            "r.code_relation + ': ' + " +
                "(SELECT ar.nom_arret " + 
                "FROM arret ar " +
                "WHERE ar.id_arret = r.FK_gare_1) + ' - ' + " +
                "(SELECT ar.nom_arret " +
                "FROM arret ar " +
                "WHERE ar.id_arret = r.FK_gare_2) AS Relation, " +
            "l1.id_ligne AS [Ligne de départ], " +
            "l2.id_ligne AS [Ligne d'arrivée], " +
            "nt.num_train AS [Numéro de train], " +
            "a.nom_arret AS [Arrêt] " +
        "FROM trajet_J_1 t " +
            "JOIN relation r ON t.FK_relation_trajet = r.id_relation " +
            "JOIN ligne l1 ON t.FK_ligne_depart = l1.id_ligne " +
            "JOIN ligne l2 ON t.FK_ligne_arrivee = l2.id_ligne " +
            "JOIN numero_train nt ON t.FK_num_train = nt.id_num_train " +
            "JOIN arret a ON t.FK_arret = a.id_arret")
        })
    },
    getByID: (id) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT t.id_trajet, " +
            "CAST(t.h_arrivee_reel AS TIME) AS [Arrivée réelle], " +
            "t.h_arrivee_prevu AS [Arrivée prévue], " +
            "t.h_depart_reel AS [Départ réel], " +
            "t.h_depart_prevu AS [Départ prévu], " +
            "t.retard_arrivee AS [Retard à l'arrivée], " +
            "t.retard_depart AS [Retard au départ], " +
            "r.code_relation + ': ' + " +
                "(SELECT ar.nom_arret " + 
                "FROM arret ar " +
                "WHERE ar.id_arret = r.FK_gare_1) + ' - ' + " +
                "(SELECT ar.nom_arret " +
                "FROM arret ar " +
                "WHERE ar.id_arret = r.FK_gare_2) AS Relation, " +
            "l1.id_ligne AS [Ligne de départ], " +
            "l2.id_ligne AS [Ligne d'arrivée], " +
            "nt.num_train AS [Numéro de train], " +
            "a.nom_arret AS [Arrêt] " +
        "FROM trajet_J_1 t " +
            "JOIN relation r ON t.FK_relation_trajet = r.id_relation " +
            "JOIN ligne l1 ON t.FK_ligne_depart = l1.id_ligne " +
            "JOIN ligne l2 ON t.FK_ligne_arrivee = l2.id_ligne " +
            "JOIN numero_train nt ON t.FK_num_train = nt.id_num_train " +
            "JOIN arret a ON t.FK_arret = a.id_arret " +
        "WHERE t.id_trajet = " + id)
        })
    }
}

module.exports = PonctualiteJModel