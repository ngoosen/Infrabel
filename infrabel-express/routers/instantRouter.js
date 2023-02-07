const express = require('express')
const InstantRouter = express.Router()
const InstantController = require('../controllers/instantController')

InstantRouter.get("/", InstantController.getAll)
InstantRouter.get("/:id([0-9]+)", InstantController.getById)
InstantRouter.get("/:language", InstantController.getByLanguage)

module.exports = InstantRouter