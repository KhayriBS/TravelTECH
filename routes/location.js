import express from 'express';
import { body } from 'express-validator';
import { addLocation, getLocation, getAllLocations, updateLocation, deleteLocation , getLocationsByPriceRange ,getLocationsNearby } from '../controllers/location.js';

const router = express.Router();

// Route pour ajouter une nouvelle location
router.post('/addlocation', [
    body('Num_Contrat').isNumeric().withMessage('Le numéro de contrat doit être un nombre'),
    body('titre').isLength({ min: 5 }).withMessage('Le titre doit contenir au moins 5 caractères'),
    body('Duree').isNumeric().withMessage('La durée doit être un nombre'),
    body('prix').isNumeric().withMessage('Le prix doit être un nombre'),
    body('emplacement').isLength({ min: 1 }).withMessage('L\'emplacement est requis'),
    body('Longitude'),
    body('largitude'),
    body('etat').isLength({ min: 1 }).withMessage('L\'état est requis')
], addLocation);

// Route pour obtenir une location par ID
router.get('/AfficherLocation/:id', getLocation);

// Route pour obtenir toutes les locations
router.get('/listedeslocation/', getAllLocations);

// Route pour mettre à jour une location
router.put('/modifierlocation/:id', [
    body('Num_Contrat').optional().isNumeric().withMessage('Le numéro de contrat doit être un nombre'),
    body('titre').optional().isLength({ min: 5 }).withMessage('Le titre doit contenir au moins 5 caractères'),
    body('Duree').optional().isNumeric().withMessage('La durée doit être un nombre'),
    body('prix').optional().isNumeric().withMessage('Le prix doit être un nombre'),
    body('emplacement').optional().isLength({ min: 1 }).withMessage('L\'emplacement est requis'),
    body('Longitude'),
    body('largitude'),
    body('etat').optional().isLength({ min: 1 }).withMessage('L\'état est requis')
], updateLocation);

// Route pour supprimer une location
router.delete('/supprimerlocation/:id', deleteLocation);

// Route pour obtenir les locations par gamme de prix
router.get('/locationparprix/price', getLocationsByPriceRange);

// Route pour obtenir les locations à proximité
router.get('/locationaproximite/nearby', getLocationsNearby);
export default router;

