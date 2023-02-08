const ArretModel = require('../models/arretModel')

const ArretController = {
    getAll : (req, res) => {
        ArretModel.getAll().then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    },
    getOne: (req, res) => {
        ArretModel.getOne(req.params.id).then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    }
}

module.exports = ArretController