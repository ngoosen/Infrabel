const express = require("express")
const router = express.Router()
const ArretRouter = require("./arretRouter")
const LigneRouter = require("./ligneRouter")
const InstantRouter = require("./instantRouter")
const IncidentTypeRouter = require("./incident_typeRouter")
const LieuRouter = require("./lieuRouter")
const IncidentRouter = require("./incidentRouter")
const RelationRouter = require("./relationRouter")
const NumTrainRouter = require("./num_trainRouter")

router.use("/api/v1/lignes", LigneRouter)
router.use("/api/v1/arrets", ArretRouter)
router.use("/api/v1/instants", InstantRouter)
router.use("/api/v1/incident_types", IncidentTypeRouter)
router.use("/api/v1/lieux", LieuRouter)
router.use("/api/v1/incidents", IncidentRouter)
router.use("/api/v1/relations", RelationRouter)
router.use("/api/v1/num_train", NumTrainRouter)

router.all("*", (req, res) => {
    res.status(404).send("Erreur 404")
})

module.exports = router