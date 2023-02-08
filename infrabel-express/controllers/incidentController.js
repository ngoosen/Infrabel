const IncidentModel = require('../models/incidentModel')

const IncidentController = {
    getAll: (req, res) => {
        IncidentModel.getAll().then((data) => {
            res.status(200).json(data.recordset)
        })
    },
    getById: (req, res) => {
        IncidentModel.getById(req.params.id).then((data) => {
            res.status(200).json(data.recordset)
        })
    }
}

module.exports = IncidentController