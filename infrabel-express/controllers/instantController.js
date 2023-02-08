const InstantModel = require('../models/instantModel')

const InstantController = {
    getAll: (req, res) => {
        InstantModel.getAll().then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    },
    getByLanguage : (req, res) => {
        InstantModel.getByLanguage(req.params.language).then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    },
    getById: (req, res) => {
        InstantModel.getById(req.params.id).then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    },
    getByIdAndLanguage: (req, res) => {
        InstantModel.getByIdAndLanguage(req.params).then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    }
}

module.exports = InstantController