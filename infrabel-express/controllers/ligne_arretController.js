const LigneArretModel = require('../models/ligne_arretModel')

const LigneArretController = {
    getAll : (req, res) => {
        LigneArretModel.getAll().then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    },
    getByLigneID: (req, res) => {
        let idToChange = (req.params.id)
        let id = idToChange.indexOf("-")
        if( id >= 0){
            idToChange = idToChange.replace(/-/g, "/")
        }

        LigneArretModel.getByLigneID(idToChange).then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    },
    getByArretID: (req, res) => {
        LigneArretModel.getByArretID(req.params.id).then((data) => {
            res.status(200).json(data.recordset)
        }).catch((err) => {
            res.status(400).json({message: "Bad Request!", error: err})
        })
    }
}
module.exports = LigneArretController