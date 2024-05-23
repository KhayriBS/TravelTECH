import express from 'express';
import { body, param } from 'express-validator';
import { addEvent, getEventByTitre, updateEvent, deleteEvent } from '../controllers/evenement.js';
import multer from '../middlewares/multer-config.js';
const router = express.Router();

// Create
router.route('/add/')
    .post(
        multer,
        body('titre').notEmpty().withMessage('Le titre est requis.'),
        body('type').notEmpty().withMessage('Le type est requis.'),
        body('description').notEmpty().withMessage('La description est requise.'),
        body('datedebut').isISO8601().toDate().withMessage('La date de début doit être une date valide.'),
        body('datefin').isISO8601().toDate().withMessage('La date de fin doit être une date valide.'),
        body('nbInvit').isInt().withMessage('Le nombre d\'invitations doit être un entier.'),

        addEvent // Using the addEvent function here
    );

// Read
router.route('/:date')
    .get(
        param('titre'),
        getEventByTitre
    );

// Update
router.route('/:id')
    .put(
        param('id').isMongoId(),
        body('titre').isLength({ min: 5, max: 50 }).optional(),
        body('datedebut').isISO8601().toDate().optional(),
        body('datefin').isISO8601().toDate().optional(),
        body('nbInvit').isInt().optional(),
        updateEvent
    );

// Delete
router.route('/:id')
    .delete(
        param('id').isMongoId(),
        deleteEvent
    );

export default router;