import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const activiteSchema = new Schema(
    {
        nomActivite: {
            type: String,
            required: true
        },
        planning: {
            type: String,
            required: true
        },
        heureDebut: {
            type: Date,
            required: true
        },
        heureFin: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        niveau: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model('Activite', activiteSchema);