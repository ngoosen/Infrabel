const dbConnect = require('./db').connect()

const NumTrainModel = {
    getAll: () => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT nt.id_num_train, " +
                "nt.num_train AS num_train, " +
                "d.id_date AS date, " +
                "i.fr_instant AS instant, " +
                "r.code_relation + ': ' + " +
                "(SELECT arr.nom_arret " +
                    "FROM arret arr " +
                    "WHERE r.FK_gare_1 = arr.id_arret) + ' - ' + " +
                "(SELECT ar.nom_arret " +
                    "FROM arret ar " +
                    "WHERE r.FK_gare_2 = ar.id_arret) AS relation " +
            "FROM numero_train nt " +
                "JOIN dates d ON nt.FK_date_num_train = d.id_date " +
                "JOIN instant i ON nt.FK_instant_num_train = i.id_instant " +
                "JOIN relation r ON nt.FK_relation_num_train = r.id_relation")
        })
    },
    getById: (id) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT nt.id_num_train, " +
                "nt.num_train AS num_train, " +
                "d.id_date AS date, " +
                "i.fr_instant AS instant, " +
                "r.code_relation + ': ' + " +
                "(SELECT arr.nom_arret " +
                    "FROM arret arr " +
                    "WHERE r.FK_gare_1 = arr.id_arret) + ' - ' + " +
                "(SELECT ar.nom_arret " +
                    "FROM arret ar " +
                    "WHERE r.FK_gare_2 = ar.id_arret) AS relation " +
            "FROM numero_train nt " +
                "JOIN dates d ON nt.FK_date_num_train = d.id_date " +
                "JOIN instant i ON nt.FK_instant_num_train = i.id_instant " +
                "JOIN relation r ON nt.FK_relation_num_train = r.id_relation " +
                "WHERE nt.id_num_train = " + id)
        })
    }
}
module.exports = NumTrainModel