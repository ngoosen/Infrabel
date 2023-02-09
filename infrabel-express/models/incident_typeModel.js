const dbConnect = require('./db').connect()

const IncidentTypeModel = {
    getAll: () => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT * FROM incident_type")
        })
    },
    getById: (id) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT * FROM incident_type WHERE id_incident_type = " + id)
        })
    },
    getByLanguage: (language) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT " + language + "_incident_type FROM incident_type")
        })
    },
    getByIdAndLanguage: (params) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT id_incident_type, " + params.language + "_incident_type FROM incident_type WHERE id_incident_type = " + params.id)
        })
    }
}

module.exports = IncidentTypeModel