const express = require("express")
const router = express.Router()
const LigneRouter = require("./ligneRouter")

router.use("/api/v1/lignes", LigneRouter)

router.all("*", (req, res) => {
    res.status(404).send("Erreur 404")
})

module.exports = router