const PonctualiteJModel = require('../models/ponctualite_j-1Model')

const PonctualiteJController = {
    getAll: (req, res) => {
        PonctualiteJModel.getAll().then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    },
    getByID: (req, res) => {
        PonctualiteJModel.getByID(req.params.id).then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    },
    getByStop: (req, res) => {
        PonctualiteJModel.getByStop((req.params.stop).toUpperCase()).then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    },
    getAverageByStop: (req, res) => {
        PonctualiteJModel.getAverageByStop((req.params.stop).toUpperCase()).then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    }
}
module.exports = PonctualiteJController