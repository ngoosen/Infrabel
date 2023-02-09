const express = require('express')
const ArretRouter = express.Router()
const ArretController = require('../controllers/arretController')

ArretRouter.get("/", ArretController.getAll)
ArretRouter.get("/:id([0-9]+)", ArretController.getOne)

module.exports = ArretRouter