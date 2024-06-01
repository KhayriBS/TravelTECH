
import Produit from "../models/produit.js"

//Ajouter produit
export function addProduct (req, res) {
   
        const {nomP, descriptionP, prix, Qt, image, stock, statusP } = req.body;

    Produit.create({
       
        nomP: nomP,
        descriptionP: descriptionP,
        prix: prix,
        Qt: Qt,
        image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
        stock: stock,
        statusP: statusP
    }
    
    ).then(newProdduct => {
        res.status(201).json({newProdduct : 'produit ajouter avec succes'})
    })
    .catch(err => {
        res.status(500).json({ error: 'Erreur lors de la création du produit' })
    })
    }


export function getProduct (req, res) {
    Produit.findById(req.params.id)
    .then( produit => {
        res.status(200).json(produit)
    })
    .catch(err => {
        res.status(500).json(err)
    })
}

export function getAllProduct (req, res) {
    Produit.find({})
    .then( produit => {
        res.status(200).json(produit)
    })
    .catch(err => {
        res.status(500).json(err)
    })
}




export function UpdateProduit (req, res) {
 
    Produit.findByIdAndUpdate(req.params.id , req.body , {new : true})
    .then(produit => {
        res.status(200).json(produit)
    })
    .catch(err => {
        res.status(404).json(err)
    })
}

export function deleteProduct (req, res) {
    Produit.findByIdAndDelete(req.params.id)
    .then(produit => {
        res.status(200).json(produit)
    })
    .catch(err => {
        res.status(404).json(err)
    })
}

