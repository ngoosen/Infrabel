const PonctualiteMomentModel = require ('../models/ponctualite_moment')

const PonctualiteMomentController = {
    getAll: (req, res) => {
        PonctualiteMomentModel.getAll().then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    },
    getById: (req, res) => {
        PonctualiteMomentModel.getById(req.params.id).then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    },
    getByStop: (req, res) => {
        PonctualiteMomentModel.getByStop((req.params.stop).toUpperCase()).then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    },
    getByStopInstant: (req, res) => {
        PonctualiteMomentModel.getByStopInstant(req.params).then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    }
}
module.exports = PonctualiteMomentController