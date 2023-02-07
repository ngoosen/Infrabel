const Connection = require('tedious').Connection
const dbConnect = require('./db').connect()
const Request = require('tedious').Request

const LigneModel = {
    getAll : () => {
        return dbConnect.then((conn)=>{
            return conn.query("SELECT * FROM ligne")
        })
    }
}

module.exports = LigneModel