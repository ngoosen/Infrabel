const express = require("express")
const router = express.Router()
const ArretRouter = require("./arretRouter")
const LigneRouter = require("./ligneRouter")

router.use("/api/v1/lignes", LigneRouter)
router.use("/api/v1/arrets", ArretRouter)

router.all("*", (req, res) => {
    res.status(404).send("Erreur 404")
})

module.exports = router