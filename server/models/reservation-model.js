const { Schema, model } = require("mongoose")

const ReservationSchema = new Schema({
    reservationCode: { type: String, unique: true, required: true },
    prAgentId: { type: Schema.Types.ObjectId, ref: 'User' },
    reserveeName: { type: String, required: true },
    numberOfPlaces: { type: String, required: true },
    instagramAccount: { type: String, required: true },
    comment: { type: String, default: '' },
    createdAt: { type: Date, default: new Date()},
    updatedAt: { type: Date, default: new Date()},
    reservationUsed: { type: Boolean, default: false },
    peopleAttended: { type: Number, default: 0 }
})

module.exports =  model("Reservation", ReservationSchema)