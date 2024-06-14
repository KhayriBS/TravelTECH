import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const reservationSchema = new Schema(
    {
        numReserv: {
            type: String,
            //required: true
        },
        etat: {
            type: Boolean,
            //required: true
        },
        dateReserv: {
            type: Date,
             //required: true
        },
        nbPers: {
            type: Number,
            //required: true
        },
        event: {
            type: Schema.Types.ObjectId,
            ref: 'evenement',
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model('Reservation', reservationSchema);