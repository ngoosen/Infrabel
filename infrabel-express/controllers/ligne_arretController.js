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
        console.log(idToChange);
        let id = idToChange.indexOf("-")
        if( id >= 0){
            console.log(id);
            idToChange = idToChange.replace(/-/g, "/")
        }
        console.log(idToChange);

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