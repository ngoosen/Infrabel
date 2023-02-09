require("dotenv").config()
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true}))

const router = require("./routers/router")
app.use(router)

const port = process.env.PORT || process.env.PORT_LOCAL || 3000
app.listen(port, console.log("Server listens at http://localhost:" + port))