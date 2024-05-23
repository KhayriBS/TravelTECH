import { validationResult } from 'express-validator';
import evenement from '../models/evenement.js';

// Create

export function addEvent(req, res) {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    } else {
        evenement.create({
            titre: req.body.titre,
            type: req.body.type,
            description: req.body.description,
            image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`,
            datedebut: req.body.datedebut,
            datefin: req.body.datefin,
            nbInvit: req.body.nbInvit
        })
        .then(newEvent => {
            res.status(200).json(newEvent);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
    }
}
// Read
export function getEventByTitre(req, res) {
    evenement.findOne({ titre: req.params.titre })
        .then(event => {
            res.status(200).json(event);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

export function getEventById(req, res) {
    evenement.findById(req.params.id)
      .then(evenement => {
        if (!evenement) {
          return res.status(404).json({ message: 'Evenement non trouvé' });
        }
        res.status(200).json(evenement);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }

// Update

export function updateEvent(req, res) {
    evenement.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedEvenement => {
        if (!updatedEvenement) {
          return res.status(404).json({ message: 'Evenement non trouvé' });
        }
        res.status(200).json(updatedEvenement);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
// Delete
export function deleteEvent(req, res) {
    evenement.findByIdAndDelete(req.params.id)
      .then(deletedEvenement => {
        if (!deletedEvenement) {
          return res.status(404).json({ message: 'Evenement non trouvé' });
        }
        res.status(200).json({ message: 'Evenement supprimé' });
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }



