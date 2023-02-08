const IncidentModel = require('../models/incidentModel')

const IncidentController = {
    getAll: (req, res) => {
        IncidentModel.getAll().then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    },
    getById: (req, res) => {
        IncidentModel.getById(req.params.id).then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    }
}

module.exports = IncidentController