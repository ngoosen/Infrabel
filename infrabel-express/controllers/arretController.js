const ArretModel = require('../models/arretModel')

const ArretController = {
    getAll : (req, res) => {
        ArretModel.getAll().then((data) => {
            res.status(200).json(data.recordset)
        })
    },
    getOne: (req, res) => {
        ArretModel.getOne(req.params.id).then((data) => {
            res.status(200).json(data.recordset)
        })
    }
}

module.exports = ArretController