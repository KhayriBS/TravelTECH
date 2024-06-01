import categorie from "../models/categorie.js";

export function addCategorie (req, res) {
    
        const {nomC, descriptionC, nbrProduit, statusC } = req.body;

    categorie.create({
       
        nomC: nomC,
        descriptionC: descriptionC,
        nbrProduit: nbrProduit,
        statusC: statusC,

    }
    
    ).then(newCategorie => {
        res.status(201).json(newCategorie)
    })
    .catch(err => {
        res.status(500).json(err)
    })
    }

export function getCategorie (req, res) {
    categorie.findById(req.params.id)
    .then( categorie => {
        res.status(200).json(categorie)
    })
    .catch(err => {
        res.status(500).json(err)
    })
}

export function getAllCategorie (req, res) {
    categorie.find({})
    .then( categorie => {
        res.status(200).json(categorie)
    })
    .catch(err => {
        res.status(500).json(err)
    })
}

export function UpdateCategorie (req, res) {
 
    categorie.findByIdAndUpdate(req.params.id , req.body , {new : true})
    .then(categorie => {
        res.status(200).json(categorie)
    })
    .catch(err => {
        res.status(404).json(err)
    })
}

export function deleteCategorie (req, res) {
    categorie.findByIdAndDelete(req.params.id)
    .then(categorie => {
        res.status(200).json(categorie)
    })
    .catch(err => {
        res.status(404).json(err)
    })
}
