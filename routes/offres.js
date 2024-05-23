import express from 'express';
import { body } from 'express-validator';
import { addOffre, getOffre, updateOffre, deleteOffre , getAllOffres } from '../controllers/offres.js';

const router = express.Router();
const typeOffreValues = ['Maison dhote', 'Villa', 'Appartement', 'Hotels', 'voitures', 'bateaux', 'Quad'];


// Route pour ajouter une nouvelle offr
router.post('/add', [
    body('titre'),
    body('description'),
    body('date_debut'),
    body('date_fin'),
    body('disponibilite'),
    body('image'),
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
    body('titre'),
    body('description'),
    body('date_debut'),
    body('date_fin'),
    body('disponibilite'),
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
export default router;
