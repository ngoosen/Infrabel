require("dotenv").config()
const express = require('express')
const app = express()

const router = require("./routers/router")
app.use(router)

const port = process.env.PORT || process.env.PORT_LOCAL || 3000
app.listen(port, console.log("Server listens at http://localhost:" + port))