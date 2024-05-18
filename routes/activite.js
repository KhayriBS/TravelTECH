import express from 'express';
import { body } from 'express-validator';
import { ajouterActivite, obtenirToutesLesActivites, obtenirActiviteParNom, mettreAJourActivite,supprimerActivite } from '../controllers/activite.js';

const router = express.Router();


const STATUS_OPTIONS = ['payant', 'gratuit'];
const NIVEAU_OPTIONS = ['facile', 'medium', 'difficile'];

router.route('/')
    .post(
        body('nomActivite').notEmpty().withMessage('Le nom de l\'activité est requis.'),
        body('planning').notEmpty().withMessage('Le planning est requis.'),
        body('heureDebut').isISO8601().toDate().withMessage('L\'heure de début doit être une date valide.'),
        body('heureFin').isISO8601().toDate().withMessage('L\'heure de fin doit être une date valide.'),

        /*body('heureFin').isISO8601().toDate().custom((value, { req }) => {
            if (value <= req.body.heureDebut) {
                throw new Error("L'heure de fin doit être postérieure à l'heure de début.");
            }
            return true;
        }),*/

        body('status').notEmpty().custom(value => STATUS_OPTIONS.includes(value)),

        body('niveau').notEmpty().custom(value => NIVEAU_OPTIONS.includes(value)),
        ajouterActivite
    )
    .get(obtenirToutesLesActivites);


router.route('/:nomActivite')
    .get(obtenirActiviteParNom);

router.route('/:id')
    .put(
        body('nomActivite').optional().notEmpty().withMessage('Le nom de l\'activité est requis.'),
        body('planning').optional().notEmpty().withMessage('Le planning est requis.'),
        body('heureDebut').optional().isISO8601().toDate().withMessage('L\'heure de début doit être une date valide.'),
        body('heureFin').optional().isISO8601().toDate().withMessage('L\'heure de fin doit être une date valide.'),
        body('status').optional().notEmpty().withMessage('Le statut est requis.'),
        body('niveau').optional().notEmpty().withMessage('Le niveau est requis.'),
        mettreAJourActivite
    )
    .delete(supprimerActivite);

export default router;
