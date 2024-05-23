import Location from '../models/location.js'; 
import { validationResult } from 'express-validator';

// Ajouter une nouvelle location
export function addLocation(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        Location.create({
            Num_Contrat: req.body.Num_Contrat,
            titre: req.body.titre,
            Duree: req.body.Duree,
            prix: req.body.prix,
            emplacement: req.body.emplacement,
            Longitude: req.body.Longitude,
            largitude: req.body.largitude,
            etat: req.body.etat
        })
        .then(newLocation => {
            res.status(201).json(newLocation);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
    }
}

// Obtenir une location par son ID
export function getLocation(req, res) {
    Location.findById(req.params.id)
        .then(location => {
            if (!location) {
                return res.status(404).json({ error: 'Location non trouvée' });
            }
            res.json(location);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

// Obtenir toutes les locations
export function getAllLocations(req, res) {
    Location.find()
        .then(locations => {
            res.json(locations);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

// Mettre à jour une location
export function updateLocation(req, res) {
    Location.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(location => {
            if (!location) {
                return res.status(404).json({ error: 'Location non trouvée' });
            }
            res.json(location);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

// Supprimer une location
export function deleteLocation(req, res) {
    Location.findByIdAndDelete(req.params.id)
        .then(location => {
            if (!location) {
                return res.status(404).json({ error: 'Location non trouvée' });
            }
            res.json({ message: 'Location supprimée avec succès' });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

// Afficher la liste des locations 
export const getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        console.log("ddddd"+locations)
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Obtenir les locations par prix
export function getLocationsByPriceRange(req, res) {
    const minPrice = parseFloat(req.query.min);
    const maxPrice = parseFloat(req.query.max);

    Location.find({ prix: { $gte: minPrice, $lte: maxPrice } })
        .then(locations => {
            res.json(locations);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

// Obtenir les locations à proximité
export function getLocationsNearby(req, res) {
    const { latitude, longitude, radius } = req.query;
    const radiusInMeters = radius * 1000;

    Location.find({
        largitude: {
            $gte: parseFloat(latitude) - radiusInMeters,
            $lte: parseFloat(latitude) + radiusInMeters
        },
        Longitude: {
            $gte: parseFloat(longitude) - radiusInMeters,
            $lte: parseFloat(longitude) + radiusInMeters
        }
    })
    .then(locations => {
        res.json(locations);
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
}