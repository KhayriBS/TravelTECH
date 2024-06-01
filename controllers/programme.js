import Programme from '../models/programme.js';
import { validationResult } from 'express-validator';

// Add prog
/* export function ajouterProgramme(req, res) {
    if (!validationResult(req).isEmpty()) {
        res.status(403).json({ err: validationResult(req).array() });
    } else {
        Programme.create(req.body)
            .then(nouveauProgramme => {
                res.status(201).json(nouveauProgramme);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
}*/

export function ajouterProgramme(req, res) {

    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }
    else {

        Programme
            .create({
                lieu: req.body.lieu,
                dateDebutProgramme: req.body.dateDebutProgramme,
                dateFinProgramme: req.body.dateFinProgramme,
                descriptionProgramme: req.body.descriptionProgramme,
                nbrTourist: req.body.nbrTourist,
                image: `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
            })

            .then(newProgramme => {
                res.status(200).json(newProgramme);
            })
            .catch(err => {
                res.status(500).json({ error: err });
            });
    }

}

// All Prog
export function obtenirTousLesProgrammes(req, res) {
    Programme.find({})
        .select(['lieu', 'dateDebutProgramme', 'dateFinProgramme', 'descriptionProgramme', 'nbrTourist', 'image'])
        .then(programmes => {
            res.status(200).json(programmes);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

// Prog by ID
/*export function obtenirProgrammeParLieu(req, res) {
    Programme.findById(req.params.lieu)
        .then(programme => {
            res.status(200).json(programme);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}*/

export function obtenirProgrammeParLieu(req, res) {
    Programme.findOne({ lieu: req.params.lieu }).then(prog => {
        res.status(200).json(prog)
    }).catch(err => {
             res.status(400).json(err)

    })
}

// Modif Prog
export function mettreAJourProgramme(req, res) {
    Programme.findByIdAndUpdate(req.params.id, {"progId" : req.body.progId})
        .then(programme => {
            res.status(200).json(programme);
        })
        .catch(err => {
            res.status(400).json(err);
        });
}

// Supp prog
export function supprimerProgramme(req, res) {
    Programme.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(200).json({ message: 'Le programme a été supprimé avec succès.' });
        })
        .catch(err => {
            res.status(400).json(err);
        });
}
