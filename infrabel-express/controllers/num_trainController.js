const NumTrainModel = require('../models/num_trainModel')

const NumTrainController = {
    getAll: (req, res) => {
        NumTrainModel.getAll().then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    },
    getById : (req, res) => {
        NumTrainModel.getById(req.params.id).then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    }
}
module.exports = NumTrainController