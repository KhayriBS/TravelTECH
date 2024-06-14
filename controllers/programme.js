import Programme from "../models/programme.js";
import Activite from "../models/activite.js";
import { validationResult } from "express-validator";

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

/* export function ajouterProgramme(req, res) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
  } else {
    Programme.create({
      lieu: req.body.lieu,
      dateDebutProgramme: req.body.dateDebutProgramme,
      dateFinProgramme: req.body.dateFinProgramme,
      descriptionProgramme: req.body.descriptionProgramme,
      nbrTourist: req.body.nbrTourist,
      image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
      Latitude: req.body.Latitude,
      Longitude: req.body.Longitude,
      activite: req.body.activite,
    })
      .then((newProgramme) => {
        res.status(200).json(newProgramme);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}
*/
export async function ajouterProgramme(req, res) {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
  } else {
    try {
      const activite = await Activite.findById(req.body.activite);
      if (!activite) {
        return res.status(404).json({ error: "Activité non trouvée" });
      }

      const newProgramme = await Programme.create({
        lieu: req.body.lieu,
        dateDebutProgramme: req.body.dateDebutProgramme,
        dateFinProgramme: req.body.dateFinProgramme,
        descriptionProgramme: req.body.descriptionProgramme,
        nbrTourist: req.body.nbrTourist,
        image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
        Latitude: req.body.Latitude,
        Longitude: req.body.Longitude,
        activite: req.body.activite,
      });

      res.status(200).json(newProgramme);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
// All Prog
export function obtenirTousLesProgrammes(req, res) {
  Programme.find({})
    .select([
      "lieu",
      "dateDebutProgramme",
      "dateFinProgramme",
      "descriptionProgramme",
      "nbrTourist",
      "image",
    ])
    .then((programmes) => {
      res.status(200).json(programmes);
    })
    .catch((err) => {
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
  Programme.findOne({ lieu: req.params.lieu })
    .then((prog) => {
      res.status(200).json(prog);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

// Modif Prog
export function mettreAJourProgramme(req, res) {
  Programme.findByIdAndUpdate(req.params.id, { progId: req.body.progId })
    .then((programme) => {
      res.status(200).json(programme);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

// Supp prog
export function supprimerProgramme(req, res) {
  Programme.findByIdAndDelete(req.params.id)
    .then(() => {
      res
        .status(200)
        .json({ message: "Le programme a été supprimé avec succès." });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

export function obtenirProgrammeParDate(req, res) {
  const { dateDebutProgramme } = req.params;

  Programme.findOne({ dateDebutProgramme: new Date(dateDebutProgramme) })
    .then((programme) => {
      if (!programme) {
        return res
          .status(404)
          .json({ message: "Aucun programme trouvé pour cette date." });
      }
      res.status(200).json(programme);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

export async function getProgramByActivity(req, res) {
  try {
    const programmes = await Programme.find({}).populate("activite").exec();

    if (!programmes || programmes.length === 0) {
      return res.status(404).json({
        message: "Aucun programme trouvé avec les activités associées.",
      });
    }

    return res.status(200).json(programmes);
  } catch (err) {
    return res.status(500).json({
      message: "Erreur lors de la récupération des activités par programme.",
      error: err.message,
    });
  }
}
