const express = require('express')
const LigneArretRouter = express.Router()
const LigneArretController = require('../controllers/ligne_arretController')

LigneArretRouter.get("/", LigneArretController.getAll)
LigneArretRouter.get("/ligne/:id", LigneArretController.getByLigneID)
LigneArretRouter.get("/arret/:id([0-9]+)", LigneArretController.getByArretID)

module.exports = LigneArretRouter