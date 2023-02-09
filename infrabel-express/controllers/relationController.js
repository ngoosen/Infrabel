const RelationModel = require('../models/relationModel')

const RelationController = {
    getAll: (req, res) => {
        RelationModel.getAll().then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    },
    getById: (req, res) => {
        RelationModel.getById(req.params.id).then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    }
}

module.exports = RelationController