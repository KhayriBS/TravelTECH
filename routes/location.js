import express from 'express';
import { body } from 'express-validator';
import { addLocation, getLocation, getAllLocations, updateLocation, deleteLocation , getLocationsByPriceRange ,getLocationsNearby } from '../controllers/location.js';

const router = express.Router();

// Route pour ajouter une nouvelle location
router.post('/addlocation', [
    body('Num_Contrat'),
    body('titre'),
    body('Duree'),
    body('prix'),
    body('emplacement'),
    body('Longitude'),
    body('latitude'),
    body('etat')
], addLocation);

// Route pour obtenir une location par ID
router.get('/AfficherLocation/:id', getLocation);

// Route pour obtenir toutes les locations
router.get('/listedeslocation/', getAllLocations);

// Route pour mettre à jour une location
router.put('/modifierlocation/:id', [
    body('Num_Contrat'),
    body('titre'),
    body('Duree'),
    body('prix'),
    body('emplacement'),
    body('Longitude'),
    body('latitude'),
    body('etat')
], updateLocation);

// Route pour supprimer une location
router.delete('/supprimerlocation/:id', deleteLocation);

// Route pour obtenir les locations par gamme de prix
router.get('/locationparprix/price', getLocationsByPriceRange);

// Route pour obtenir les locations à proximité
router.get('/locationaproximite/nearby', getLocationsNearby);
export default router;

