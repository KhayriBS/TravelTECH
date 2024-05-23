import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const location = new Schema(
    {
        Num_Contrat: {
            type: Number,
            required: true
        },
        titre: {
            type: String,
            required: true
        },
        Duree: {
            type: Number,
            required: true
        },
        prix: {
            type: Number,
            required: true
        },
        etat: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model('location', location); 