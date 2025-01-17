import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const eventSchema = new Schema(
    {
        titre: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
       image: {
            type: String,
            required: true
        },
        datedebut: {
            type: Date,
            required: true
        },
        datefin: {
            type: Date,
            required: true
        },
        nbInvit: {
            type: Number,
            required: true
        },
        archive: {
            type: Boolean,
            default: false
        },
        favoris: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            default: []
        },
        reservations: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            reservationId: {
                type: Schema.Types.ObjectId,
                ref: 'Reservation',
                required: true
            }
        }]
    },
    {
        timestamps: true
    }
);

export default model('Evenement', eventSchema);