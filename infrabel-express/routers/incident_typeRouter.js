const express = require('express')
const IncidentTypeRouter = express.Router()
const IncidentTypeController = require('../controllers/incident_typeController')

IncidentTypeRouter.get("/", IncidentTypeController.getAll)
IncidentTypeRouter.get("/:id([0-9]+)", IncidentTypeController.getById)
IncidentTypeRouter.get("/:id([0-9]+)/:language", IncidentTypeController.getByIdAndLanguage)
IncidentTypeRouter.get("/:language", IncidentTypeController.getByLanguage)

module.exports = IncidentTypeRouter