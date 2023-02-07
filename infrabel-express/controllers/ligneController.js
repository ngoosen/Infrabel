const LigneModel = require('../models/ligneModel')

const LigneController = {
    getLines : (req, res) => {
        LigneModel.getAll().then((data) => {
            res.status(200).json(data.recordset)
        })
    }
}

module.exports = LigneController