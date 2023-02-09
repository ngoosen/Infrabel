const dbConnect = require('./db').connect()

const InstantModel = {
    getAll : () => {
        return dbConnect.then((conn)=>{
            return conn.query("SELECT * FROM instant")
        })
    },
    getByLanguage : (language) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT id_instant, " + language + "_instant FROM instant")
        })
    },
    getById : (id) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT * FROM instant WHERE id_instant = " + id)
        })
    },
    getByIdAndLanguage: (params) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT id_instant, " + params.language + "_instant FROM instant WHERE id_instant = " + params.id)
        })
    }
}

module.exports = InstantModel