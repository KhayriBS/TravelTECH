import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const programmeSchema = new Schema(
    {
        lieu: {
            type: String,
            required: true
        },
        dateDebutProgramme: {
            type: Date,
            required: true
        },
        dateFinProgramme: {
            type: Date,
            required: true
        },
        descriptionProgramme: {
            type: String,
            required: true
        },
        nbrTourist: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model('Programme', programmeSchema);