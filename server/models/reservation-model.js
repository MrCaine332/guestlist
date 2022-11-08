const { Schema, model } = require("mongoose")

const ReservationSchema = new Schema({
    reservationCode: { type: String, unique: true, required: true },
    prAgentId: { type: Schema.Types.ObjectId },
    reserveeName: { type: String, required: true },
    numberOfPlaces: { type: String, required: true },
    instagramAccount: { type: String, required: true },
    comment: { type: String, default: '' },
    createdAt: { type: Date, default: new Date().toISOString()},
    updatedAt: { type: Date, default: new Date().toISOString()},
})

module.exports =  model("Reservation", ReservationSchema)