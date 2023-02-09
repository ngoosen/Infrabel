const dbConnect = require('./db').connect()

const LieuModel = {
    getAll : () => {
        return dbConnect.then((conn)=>{
            return conn.query("SELECT * FROM lieu")
        })
    },
    getByLanguage : (language) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT id_lieu, " + language + "_lieu FROM lieu")
        })
    },
    getById : (id) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT * FROM lieu WHERE id_lieu = " + id)
        })
    },
    getByIdAndLanguage: (params) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT id_lieu, " + params.language + "_lieu FROM lieu WHERE id_lieu = " + params.id)
        })
    }
}

module.exports = LieuModel