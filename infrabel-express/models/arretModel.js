const dbConnect = require('./db').connect()

const ArretModel = {
    getAll : () => {
        return dbConnect.then((conn)=>{
            return conn.query("SELECT * FROM arret")
        })
    },
    getOne : (id) => {
        return dbConnect.then((conn) => {
            return conn.query("SELECT * FROM arret WHERE id_arret = " + id)
        })
    }
}

module.exports = ArretModel