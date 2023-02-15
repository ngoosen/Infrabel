const express = require('express')
const IncidentRouter = express.Router()
const IncidentController = require('../controllers/incidentController')

IncidentRouter.get("/", IncidentController.getAll)
IncidentRouter.get("/:place", IncidentController.getByPlace)
IncidentRouter.get("/:id([0-9]+)", IncidentController.getById)

module.exports = IncidentRouter