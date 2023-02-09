const express = require ('express')
const NumTrainRouter = express.Router()
const NumTrainController = require('../controllers/num_trainController')

NumTrainRouter.get("/", NumTrainController.getAll)
NumTrainRouter.get("/:id([0-9]+)", NumTrainController.getById)

module.exports = NumTrainRouter