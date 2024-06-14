import express from 'express';
import { body, param } from 'express-validator';
import { addEvent, getEventByTitre, updateEvent, deleteEvent ,  getEventsBetweenDates , countEvents,
    getRecentEvents, getTodayEvents, archiveExpiredEvents, getArchivedEvents, toggleFavoris, getReservationsByEvent, addReservationToEvent } from '../controllers/evenement.js';
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
// Count events
router.route('/events/count')
    .get(
        countEvents
    );

// Getrecentevents
router.route('/events/recent')
    .get(
        getRecentEvents
    );// Example: /events/recent?limit=5 

// gettodayevents
router.route('/events/today')
    .get(
        getTodayEvents
    );

//geteventbetweendates
router.route('/events/between')
    .get(
        getEventsBetweenDates
    );
    
//archives
router.route('/events/archiveExpired')
    .put(
        archiveExpiredEvents
    );

//getarchives
router.route('/events/archived')
    .get(
        getArchivedEvents
    );

//favoris 
router.route('/event/favoris/:id')
    .put(
        toggleFavoris
    );
//addReservationToEvent
router.route('/events/:eventId/reservations')
    .post(
        addReservationToEvent
    );
//getReservationsByEvent
router.route('/events/:eventId/reservations')
    .get(
        getReservationsByEvent
    );


router.post('/events/:eventId/reservations', addReservationToEvent);
router.get('/events/:eventId/reservations', getReservationsByEvent);
export default router;