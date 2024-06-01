import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const offres  = new Schema(
    {
        titre: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        date_debut: {
            type: Date,
            required: true
        },
        date_fin: {
            type: Date,
            required: true
        },
        disponibilite: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        prix: {
            type: Number,
            required: true
        },
        type_offre: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model('Offre', offres); 