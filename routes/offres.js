import express from 'express';
import { body } from 'express-validator';
import { addOffre, getOffre, updateOffre, deleteOffre , getAllOffres,getOffresByType ,getOffresByPriceRange,countAvailableOffres,getOffresTitlesAndPrices } from '../controllers/offres.js';

const router = express.Router();
const typeOffreValues = ['Maison dhote', 'Villa', 'Appartement', 'Hotels', 'voitures', 'bateaux', 'Quad'];


// Route pour ajouter une nouvelle offr
router.post('/add', [
    body('titre').isLength({ min: 3 }).withMessage('Le titre doit contenir au moins 3 caractères'),
    body('description').isLength({ min: 5 }).withMessage('La description doit contenir au moins 5 caractères'),
    body('date_debut').isISO8601().withMessage('La date de début doit être une date valide'),
    body('date_fin').isISO8601().withMessage('La date de fin doit être une date valide'),
    body('disponibilite').notEmpty().withMessage('La disponibilité ne doit pas être vide'),
    body('image').optional().notEmpty().withMessage('L\'image ne doit pas être vide'),
    body('prix'),
    body('type_offre').custom(value => {
        if (!typeOffreValues.includes(value)) {
            throw new Error('Le type d\'offre doit être l\'une des valeurs suivantes : ' + typeOffreValues.join(', '));
        }
        return true;
    })
], addOffre);



// Route pour obtenir une offre par son ID
router.get('/getoffre/:id', getOffre);

// Route pour mettre à jour une offre par son ID
router.put('/updateoffre/:id', [
    body('titre').optional().isLength({ min: 3 }).withMessage('Le titre doit contenir au moins 3 caractères'),
    body('description').optional().isLength({ min: 5 }).withMessage('La description doit contenir au moins 5 caractères'),
    body('date_debut').optional().isISO8601().withMessage('La date de début doit être une date valide'),
    body('date_fin').optional().isISO8601().withMessage('La date de fin doit être une date valide'),
    body('disponibilite').optional().notEmpty().withMessage('La disponibilité ne doit pas être vide'),
    body('image'),
    body('prix'),
    body('type_offre').optional().custom(value => {
        if (!typeOffreValues.includes(value)) {
            throw new Error('Le type d\'offre doit être l\'une des valeurs suivantes : ' + typeOffreValues.join(', '));
        }
        return true;
    }) 
], updateOffre);

// Route pour supprimer une offre par son ID
router.delete('/deleteoffre/:id', deleteOffre);
router.get('/listeoffe/',getAllOffres)
// Route pour rechercher des offres par type
router.get('/typeoffre/:type', getOffresByType);
// Route pour filtrer des offres par plage de prix
router.get('/offreprice', getOffresByPriceRange);

// Route pour compter les offres disponibles
router.get('/offrecount/available', countAvailableOffres);
//Route pour extraire le titre de l'offre et le prix pour avoir de statistique 
router.get('/titles-prices', getOffresTitlesAndPrices);

export default router;
