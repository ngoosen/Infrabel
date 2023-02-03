const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hello World!")
})
router.all("*", (req, res) => {
    res.status(404).send("Erreur 404")
})

module.exports = router