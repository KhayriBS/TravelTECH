import Offre from '../models/offre.js';
import { validationResult } from 'express-validator';


export function addOffre(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    Offre.create({
        titre: req.body.titre,
        description: req.body.description,
        date_debut: req.body.date_debut,
        date_fin: req.body.date_fin,
        disponibilite: req.body.disponibilite,
        image: req.body.image, 
        prix: req.body.prix,
        type_offre: req.body.type_offre
    })
    .then(newOffre => {
        res.status(201).json(newOffre);
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
}


// Obtenir une offre par son ID
export function getOffre(req, res) {
    Offre.findById(req.params.id)
        .then(offre => {
            if (!offre) {
                return res.status(404).json({ error: 'Offre non trouvée' });
            }
            res.json(offre);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

// Mettre à jour une offre
export function updateOffre(req, res) {
    Offre.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(offre => {
            if (!offre) {
                return res.status(404).json({ error: 'Offre non trouvée' });
            }
            res.json(offre);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

// Supprimer une offre
export function deleteOffre(req, res) {
    Offre.findByIdAndDelete(req.params.id)
        .then(offre => {
            if (!offre) {
                return res.status(404).json({ error: 'Offre non trouvée' });
            }
            res.json({ message: 'Offre supprimée avec succès' });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}
// Obtenir toutes les offres
export function getAllOffres(req, res) {
    Offre.find()
        .then(offres => {
            res.json(offres);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}