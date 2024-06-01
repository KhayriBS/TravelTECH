import express from "express";
import { body } from "express-validator";
import {
  ajouterProgramme,
  obtenirTousLesProgrammes,
  obtenirProgrammeParLieu,
  mettreAJourProgramme,
  supprimerProgramme,
  obtenirProgrammeParDate,
  getProgramByActivity,
} from "../controllers/programme.js";
import multer from "../middlewares/multer-config.js";

const router = express.Router();

router
  .route("/")
  // Endpoint pour ajouter un programme
  .post(
    multer,
    body("lieu").notEmpty().withMessage("Le lieu est requis."),
    body("dateDebutProgramme")
      .isISO8601()
      .toDate()
      .withMessage("La date de début doit être une date valide."),
    body("dateFinProgramme")
      .isISO8601()
      .toDate()
      .withMessage("La date de fin doit être une date valide."),
    body("descriptionProgramme")
      .notEmpty()
      .withMessage("La description du programme est requise."),
    body("nbrTourist")
      .isInt()
      .withMessage("Le nombre de touristes doit être un entier.")
      .custom((value, { req }) => {
        if (value > 15) {
          throw new Error("Le nombre de touristes ne peut pas dépasser 15.");
        }
        return true;
      }),
    body("Latitude")
      .isFloat()
      .withMessage("Latitude du programme est requise."),
    body("Longitude")
      .isFloat()
      .withMessage("Longitude du programme est requise."),

    //body("Activity").notEmpty().withMessage("Le activité est requis."),
    ajouterProgramme
  )
  .get(obtenirTousLesProgrammes);

router.route("/:lieu").get(obtenirProgrammeParLieu);

router.route("/date/:dateDebutProgramme").get(obtenirProgrammeParDate);

router.route("/ActiviteProgramme").get(getProgramByActivity);

router
  .route("/:id")
  .put(
    body("lieu").optional().notEmpty().withMessage("Le lieu est requis."),
    body("dateDebutProgramme")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("La date de début doit être une date valide."),
    body("dateFinProgramme")
      .optional()
      .isISO8601()
      .toDate()
      .withMessage("La date de fin doit être une date valide."),
    body("descriptionProgramme")
      .optional()
      .notEmpty()
      .withMessage("La description du programme est requise."),
    body("nbrTourist")
      .optional()
      .isInt()
      .withMessage("Le nombre de touristes doit être un entier.")
      .custom((value, { req }) => {
        if (value > 15) {
          throw new Error("Le nombre de touristes ne peut pas dépasser 15.");
        }
        return true;
      }),
    mettreAJourProgramme
  )
  .delete(supprimerProgramme);

export default router;
