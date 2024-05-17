import Activite from '../models/activite.js';
import { validationResult } from 'express-validator';

export function ajouterActivite(req, res) {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    } else {
        Activite.create({
            nomActivite: req.body.nomActivite,
            planning: req.body.planning,
            heureDebut: req.body.heureDebut,
            heureFin: req.body.heureFin,
            status: req.body.status,
            niveau: req.body.niveau
        })
        .then(newActivite => {
            res.status(201).json(newActivite);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
    }
}


export function obtenirToutesLesActivites(req, res) {
    Activite.find({})
        .select(['nomActivite', 'planning', 'heureDebut', 'heureFin', 'status', 'niveau'])
        .then(activites => {
            res.status(200).json(activites);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}


export function obtenirActiviteParNom(req, res) {
    Activite.findOne({ nomActivite: req.params.nomActivite })
        .then(activite => {
            if (!activite) {
                return res.status(404).json({ message: 'Activité non trouvée' });
            }
            res.status(200).json(activite);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

export function mettreAJourActivite(req, res) {
    Activite.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(activite => {
            if (!activite) {
                return res.status(404).json({ message: 'Activité non trouvée' });
            }
            res.status(200).json(activite);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}


export function supprimerActivite(req, res) {
    Activite.findByIdAndDelete(req.params.id)
        .then(activite => {
            if (!activite) {
                return res.status(404).json({ message: 'Activité non trouvée' });
            }
            res.status(200).json({ message: 'L\'activité a été supprimée avec succès.' });
        })
        .catch(err => {
            res.status(400).json(err);
        });
}
