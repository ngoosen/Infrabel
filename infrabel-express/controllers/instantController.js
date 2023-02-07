const InstantModel = require('../models/instantModel')

const InstantController = {
    getAll: (req, res) => {
        InstantModel.getAll().then((data) => {
            res.status(200).json(data.recordset)
        })
    },
    getByLanguage : (req, res) => {
        InstantModel.getByLanguage(req.params.language).then((data) => {
            res.status(200).json(data.recordset)
        })
    },
    getById: (req, res) => {
        InstantModel.getById(req.params.id).then((data) => {
            res.status(200).json(data.recordset)
        })
    }
}

module.exports = InstantController