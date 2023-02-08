const IncidentTypeModel = require ('../models/incident_typeModel')

const IncidentTypeController = {
    getAll: (req, res) => {
        IncidentTypeModel.getAll().then((data) => {
            res.status(200).json(data.recordset)
        })
    },
    getById: (req, res) => {
        IncidentTypeModel.getById(req.params.id).then((data) => {
            res.status(200).json(data.recordset)
    })
    },
    getByLanguage: (req, res) => {
        IncidentTypeModel.getByLanguage(req.params.language).then((data) => {
            res.status(200).json(data.recordset)
        })
    },
    getByIdAndLanguage: (req, res) => {
        IncidentTypeModel.getByIdAndLanguage(req.params).then((data) => {
            res.status(200).json(data.recordset)
        })
    }
}
module.exports = IncidentTypeController