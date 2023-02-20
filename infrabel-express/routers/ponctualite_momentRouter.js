const express = require ('express')
const PonctualiteMomentRouter = express.Router()
const PonctualiteMomentController = require('../controllers/ponctualite_moment')

PonctualiteMomentRouter.get("/", PonctualiteMomentController.getAll)
PonctualiteMomentRouter.get("/:stop", PonctualiteMomentController.getByStop)
PonctualiteMomentRouter.get("/:id([0-9]+)", PonctualiteMomentController.getById)

module.exports = PonctualiteMomentRouter