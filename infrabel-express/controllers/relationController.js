const RelationModel = require('../models/relationModel')

const RelationController = {
    getAll: (req, res) => {
        RelationModel.getAll().then((data) => {
            res.status(200).json(data.recordset)
        })
    },
    getById: (req, res) => {
        RelationModel.getById(req.params.id).then((data) => {
            res.status(200).json(data.recordset)
        })
    }
}

module.exports = RelationController