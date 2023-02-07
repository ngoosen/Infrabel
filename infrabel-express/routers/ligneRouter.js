const express = require('express')
const LigneRouter = express.Router()
const LigneController = require('../controllers/ligneController')

LigneRouter.get("/", LigneController.getLines)

module.exports = LigneRouter
