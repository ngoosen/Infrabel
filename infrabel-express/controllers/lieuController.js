const LieuModel = require ('../models/lieuModel')

const LieuController = {
    getAll: (req, res) => {
        LieuModel.getAll().then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    },
    getById: (req, res) => {
        LieuModel.getById(req.params.id).then((data) => {
            res.status(200).json(data.recordset)
    }).catch((err) => {
        res.status(400).json({message: "Bad Request!", error: err})
    })
    },
    getByLanguage: (req, res) => {
        LieuModel.getByLanguage(req.params.language).then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    },
    getByIdAndLanguage: (req, res) => {
        LieuModel.getByIdAndLanguage(req.params).then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    }
}
module.exports = LieuController