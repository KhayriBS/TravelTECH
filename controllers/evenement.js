import { validationResult } from 'express-validator';
import evenement from '../models/evenement.js';



// Tableau pour stocker les événements archivés
let archivedEvents = [];

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
            nbInvit: req.body.nbInvit,
            archive: req.body.archive || false,
            favoris: req.body.favoris || []
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
//geteventbetweendates
export function getEventsBetweenDates(req, res) {
  const { start, end } = req.query;

  evenement.find({
      $and: [
          { datedebut: { $gte: new Date(start) } },
          { datefin: { $lte: new Date(end) } }
      ]
  })
  .then(events => {
      res.status(200).json(events);
  })
  .catch(err => {
      res.status(400).json(err);
  });
}

//countevents
export function countEvents(req, res) {
  evenement.countDocuments()
      .then(count => {
          res.status(200).json({ count });
      })
      .catch(err => {
          res.status(400).json(err);
      });
}
//getrecentevents
export function getRecentEvents(req, res) {
  const { limit = 5 } = req.query;

  evenement.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .then(events => {
          res.status(200).json(events);
      })
      .catch(err => {
          res.status(400).json(err);
      });
}

//gettodayevents
export function getTodayEvents(req, res) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  evenement.find({
      datedebut: { $lte: end },
      datefin: { $gte: start }
  })
  .then(events => {
      res.status(200).json(events);
  })
  .catch(err => {
      res.status(400).json(err);
  });
}

//geteventsgroupedbytype
export function getEventsGroupedByType(req, res) {
  evenement.aggregate([
      {
          $group: {
              _id: "$type",
              count: { $sum: 1 }
          }
      },
      {
          $sort: { count: -1 }
      }
  ])
  .then(result => {
      res.status(200).json(result);
  })
  .catch(err => {
      res.status(400).json(err);
  });
}


//archives
export function archiveExpiredEvents(req, res) {
    const today = new Date();

    evenement.find({
        datefin: { $lt: today },
        archive: false
    })
    .then(events => {
        if (events.length === 0) {
            return res.status(200).json({ message: 'Aucun événement à archiver' });
        }

        // Archiver les événements
        archivedEvents.push(...events);

        // Mettre à jour les événements pour les marquer comme archivés
        return evenement.updateMany(
            { _id: { $in: events.map(event => event._id) } },
            { $set: { archive: true } }
        );
    })
    .then(() => {
        res.status(200).json({ message: 'Événements archivés avec succès', archivedEvents });
    })
    .catch(err => {
        res.status(400).json(err);
    });
}

//get archives
export function getArchivedEvents(req, res) {
    res.status(200).json(archivedEvents);
}


//events favoris
export function toggleFavoris(req, res) {
  const userId = req.body.userId;
  const eventId = req.params.id;

  evenement.findById(eventId)
      .then(event => {
          if (!event) {
              return res.status(404).json({ message: 'Événement non trouvé' });
          }

          const index = event.favoris.indexOf(userId);
          if (index === -1) {
              event.favoris.push(userId); // Ajouter aux favoris
          } else {
              event.favoris.splice(index, 1); // Retirer des favoris
          }

          return event.save();
      })
      .then(updatedEvent => {
          res.status(200).json(updatedEvent);
      })
      .catch(err => {
          res.status(400).json(err);
      });
}
//addreservationtoevent
export function addReservationToEvent(req, res) {
    const { eventId, userId, reservationDetails } = req.body;

    // Créer une nouvelle réservation
    Reservation.create(reservationDetails)
        .then(newReservation => {
            return evenement.findByIdAndUpdate(
                eventId,
                { $push: { reservations: { userId, reservationId: newReservation._id } } },
                { new: true, useFindAndModify: false }
            );
        })
        .then(updatedEvent => {
            res.status(200).json(updatedEvent);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}
//getresrevationbyevent
export function getReservationsByEvent(req, res) {
    const eventId = req.params.eventId;

    evenement.findById(eventId)
        .populate('reservations.userId')
        .populate('reservations.reservationId')
        .then(event => {
            if (!event) {
                return res.status(404).json({ message: 'Événement non trouvé' });
            }
            res.status(200).json(event.reservations);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}
