const dbConnect = require('./db').connect()

const LigneModel = {
    getAll : () => {
        return dbConnect.then((conn)=>{
            return conn.query("SELECT * FROM ligne")
        })
    }
}

module.exports = LigneModel