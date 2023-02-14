const express = require('express')
const PonctualiteJRouter = express.Router()
const PonctualiteJController = require('../controllers/ponctualite_j-1Controller')

PonctualiteJRouter.get("/", PonctualiteJController.getAll)
PonctualiteJRouter.get("/:stop", PonctualiteJController.getByStop)
PonctualiteJRouter.get("/:id([0-9]+)", PonctualiteJController.getByID)

module.exports = PonctualiteJRouter