const express = require('express')
const IncidentRouter = express.Router()
const IncidentController = require('../controllers/incidentController')

IncidentRouter.get("/", IncidentController.getAll)
IncidentRouter.get("/:id([0-9]+)", IncidentController.getById)
IncidentRouter.get("/:place", IncidentController.getByPlace)

module.exports = IncidentRouter