import mongoose from "mongoose";
const { Schema, model } = mongoose;

const programmeSchema = new Schema(
  {
    lieu: {
      type: String,
      required: true,
    },
    dateDebutProgramme: {
      type: Date,
      required: true,
    },
    dateFinProgramme: {
      type: Date,
      required: true,
    },
    descriptionProgramme: {
      type: String,
      required: true,
    },
    nbrTourist: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    Latitude: {
      type: Number,
      required: true,
    },
    Longitude: {
      type: Number,
      required: true,
    },
    activite: {
      // Modifier le champ de référence à "activite"
      type: Schema.Types.ObjectId,
      ref: "Activite", // Utiliser le modèle d'activité correctement nommé
    },
  },
  {
    timestamps: true,
  }
);

export default model("Programme", programmeSchema);
