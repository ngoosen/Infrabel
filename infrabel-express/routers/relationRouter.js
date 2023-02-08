const express = require('express')
const RelationRouter = express.Router()
const RelationController = require('../controllers/relationController')

RelationRouter.get("/", RelationController.getAll)
RelationRouter.get("/:id([0-9]+)", RelationController.getById)

module.exports = RelationRouter