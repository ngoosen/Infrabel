const LieuModel = require ('../models/lieuModel')

const LieuController = {
    getAll: (req, res) => {
        LieuModel.getAll().then((data) => {
            res.status(200).json(data.recordset)
        })
    },
    getById: (req, res) => {
        LieuModel.getById(req.params.id).then((data) => {
            res.status(200).json(data.recordset)
    })
    },
    getByLanguage: (req, res) => {
        LieuModel.getByLanguage(req.params.language).then((data) => {
            res.status(200).json(data.recordset)
        })
    },
    getByIdAndLanguage: (req, res) => {
        LieuModel.getByIdAndLanguage(req.params).then((data) => {
            res.status(200).json(data.recordset)
        })
    }
}
module.exports = LieuController