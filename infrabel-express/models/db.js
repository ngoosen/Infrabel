require("dotenv").config()
const sql = require('mssql')

let config = {
    user: process.env.DB_USER,
    password: process.env.DB_PSWD,
    server: process.env.DB_SERVER, 
    database: process.env.DB_NAME,
    options: {
        // encrypt: true, // for azure
        trustServerCertificate: true
        }
}

module.exports = {
    connect: () => {
        return new sql.ConnectionPool(config)
        .connect()
        .then(pool => {
            return pool}
        )
        .catch(err => {
            console.log("Connection failed: " + err);
        })
    }
}