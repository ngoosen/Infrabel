const express = require("express")
const router = express.Router()
const ArretRouter = require("./arretRouter")
const LigneRouter = require("./ligneRouter")
const InstantRouter = require("./instantRouter")

router.use("/api/v1/lignes", LigneRouter)
router.use("/api/v1/arrets", ArretRouter)
router.use("/api/v1/instants", InstantRouter)

router.all("*", (req, res) => {
    res.status(404).send("Erreur 404")
})

module.exports = router