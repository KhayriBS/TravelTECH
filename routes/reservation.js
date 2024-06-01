import express from 'express';
import { body, param } from 'express-validator';
import { addReservation, getReservations, getReservationById, updateReservation, deleteReservation } from '../controllers/reservation.js';

const router = express.Router();

// Create
router.route('/')
  .post(
    body('numReserv').isLength({ min: 1 }),
    body('etat').isBoolean(),
    body('dateReserv').isISO8601().toDate(),
    body('nbPers').isInt(),
    addReservation
  );

// Read
router.route('/')
  .get(
    getReservations
  );

router.route('/:id')
  .get(
    param('id').isMongoId(),
    getReservationById
  );

// Update
router.route('/:id')
  .put(
    param('id').isMongoId(),
    updateReservation
  );

// Delete
router.route('/:id')
  .delete(
    param('id').isMongoId(),
    deleteReservation
  );

export default router;