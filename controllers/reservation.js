import Reservation from '../models/reservation.js';
import evenement from '../models/evenement.js';
import transporter from '../config/emailConfig.js';
import { validationResult } from 'express-validator';

//envoi de mail de confirmation
function sendConfirmationEmail(reservation) {
  const mailOptions = {
      from: 'loulamhamdi@gmail.com', // Remplacez par votre adresse e-mail
      to: 'jlassimalek770@gmail.com', // Remplacez par l'adresse e-mail du destinataire
      subject: 'Confirmation de réservation',
      text: `Votre réservation numéro ${reservation.numReserv} a été confirmée.`
  };

  transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });
}

// Create
export function addReservation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(403).json({ err: errors.array() });
  }

  Reservation.create(req.body)
      .then(newReservation => {
          sendConfirmationEmail(newReservation);
          res.status(200).json(newReservation);
      })
      .catch(err => {
          res.status(400).json(err);
      });
}

/*export function addReservation(req, res) {
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
}*/

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
//getReservationByEvent
export function getReservationByEvent(req, res) {
  const eventId = req.params.eventId;

  evenement.findById(eventId)
      .then(event => {
          if (!event) {
              return res.status(404).json({ message: 'Événement non trouvé' });
          }

          return Reservation.find({ event: eventId });
      })
      .then(reservations => {
          res.status(200).json(reservations);
      })
      .catch(err => {
          res.status(400).json(err);
      });
}

//reservation archives attribut