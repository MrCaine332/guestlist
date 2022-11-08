
const ShortUniqueId = require('short-unique-id')
const ReservationModel = require("../models/reservation-model");
const qrcode = require('qrcode')
const instagram = require("../instagram");
const ApiError = require("../exceptions/api-error");


class ReservationService {

    async create(body) {
        const userId = await this.getIGUserId(body.instagramAccount)

        if (!userId) {
            throw ApiError.BadRequest('Instagram account was not found')
        }

        const uid = new ShortUniqueId({ length: 10 })
        const uuid = uid().toUpperCase()

        const reservation = await ReservationModel.create({
            reservationCode: uuid,
            ...body
        })

        const thread = instagram.ig.entity.directThread([userId.toString()]);
        const response = await thread
            .broadcastText(`Your reservation ${reservation.reservationCode} has been registered`);

        return reservation
    }

    async update(code, body) {
        const userId = await this.getIGUserId(body.instagramAccount)

        if (!userId) {
            throw ApiError.BadRequest('Instagram account was not found')
        }

        await ReservationModel.updateOne({ code }, {...body})
        const reservation = await ReservationModel.findOne({ code })

        const thread = instagram.ig.entity.directThread([userId.toString()]);
        const response = await thread
            .broadcastText(`Your reservation ${reservation.reservationCode} has been updated`);

        return reservation
    }

    async get(code) {
        const reservation = await ReservationModel.findOne({ reservationCode: code })
        return reservation
    }

    async getByPrAgentId(prAgentId) {
        const reservations = await ReservationModel.find({ prAgentId })
        return reservations
    }

    async getAll() {
        const reservations = await ReservationModel.find()
        return reservations
    }

    async generateQRCode(reservationCode) {
        const qr = await qrcode.toDataURL(`http://localhost:3000/reservation/${reservationCode}`)
        return qr
    }

    async getIGUserId(instagramAccount) {
        const userId = await instagram.ig.user.getIdByUsername(instagramAccount)
            .catch(() => {
                throw ApiError.BadRequest('Instagram account was not found')
            });

        return userId
    }

}

module.exports = new ReservationService()