import Reservation from '../models/reservation.js';
import { validationResult } from 'express-validator';

// Create
export function addReservation(req, res) {
    if (!validationResult(req).isEmpty()) {
        res.status(403).json({ err: validationResult(req).array() });
    } else {
        Reservation.create(req.body)
            .then(newReservation => {
                res.status(200).json(newReservation);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
}

// Read
export function getReservations(req, res) {
    Reservation.find()
      .then(reservations => {
        res.status(200).json(reservations);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
  
  export function getReservationById(req, res) {
    Reservation.findById(req.params.id)
      .then(reservation => {
        if (!reservation) {
          return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.status(200).json(reservation);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
  

// Update
export function updateReservation(req, res) {
    Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedReservation => {
        if (!updatedReservation) {
          return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.status(200).json(updatedReservation);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }

// Delete
export function deleteReservation(req, res) {
    Reservation.findByIdAndDelete(req.params.id)
      .then(deletedReservation => {
        if (!deletedReservation) {
          return res.status(404).json({ message: 'Réservation non trouvée' });
        }
        res.status(200).json({ message: 'Réservation supprimée' });
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }