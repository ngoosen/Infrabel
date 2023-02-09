const LigneModel = require('../models/ligneModel')

const LigneController = {
    getLines : (req, res) => {
        LigneModel.getAll().then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    }
}

module.exports = LigneController