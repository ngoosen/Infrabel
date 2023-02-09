const express = require('express')
const LieuRouter = express.Router()
const LieuController = require('../controllers/lieuController')

LieuRouter.get("/", LieuController.getAll)
LieuRouter.get("/:id([0-9]+)", LieuController.getById)
LieuRouter.get("/:id([0-9]+)/:language", LieuController.getByIdAndLanguage)
LieuRouter.get("/:language", LieuController.getByLanguage)

module.exports = LieuRouter