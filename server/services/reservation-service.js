
const ShortUniqueId = require('short-unique-id')
const ReservationModel = require("../models/reservation-model");
const qrcode = require('qrcode')
const instagram = require("../instagram");
const ApiError = require("../exceptions/api-error");
const pngToJpeg = require('png-to-jpeg');
const { Parser } = require('json2csv');
const fs = require("fs");

class ReservationService {

    async create(body) {
        const obj = JSON.parse(fs.readFileSync('status.json', 'utf8'));
        if (!obj.opened) {
            throw ApiError.BadRequest('Reservation is closed')
        }

        const userId = await this.getIGUserId(body.instagramAccount)

        if (!userId) {
            throw ApiError.BadRequest('Instagram account was not found')
        }

        const uid = new ShortUniqueId({ length: 10 })
        const uuid = uid().toUpperCase()

        const reservation = await ReservationModel.create({
            reservationCode: uuid,
            ...body,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const thread = instagram.ig.entity.directThread([userId.toString()]);
        await thread
            .broadcastText(`Your reservation ${reservation.reservationCode} has been registered`);

        const qr = await this.generateQRCode(reservation._id)

        this.sendQRCode(qr, thread)

        return {reservation: reservation, qrCode: qr}
    }

    async update(id, body) {
        // const userId = await this.getIGUserId(body.instagramAccount)
        //
        // if (!userId) {
        //     throw ApiError.BadRequest('Instagram account was not found')
        // }

        await ReservationModel.updateOne({ _id: id }, {...body})
        const reservation = await ReservationModel.findById(id)

        // const thread = instagram.ig.entity.directThread([userId.toString()]);
        // await thread
        //     .broadcastText(`Your reservation ${reservation.reservationCode} has been updated`);

        return reservation
    }

    async get(id) {
        const reservation = await ReservationModel.findById(id)
        if (!reservation) {
            throw ApiError.BadRequest('Reservation was not found')
        }
        return reservation
    }

    async getByCode(code) {
        const reservation = await ReservationModel.findOne({ reservationCode: code })
        if (!reservation) {
            throw ApiError.BadRequest('Reservation was not found')
        }
        return reservation
    }

    async getAll() {
        const reservations = await ReservationModel.find()
        return reservations
    }

    async getByPrAgentId(prAgentId) {
        const reservations = await ReservationModel.find({ prAgentId })
        return reservations
    }

    async generateQRCode(id) {
        const qr = await qrcode.toDataURL(`http://${process.env.DOMAIN}/scan/${id}`)
        return qr
    }

    async getIGUserId(instagramAccount) {
        const userId = await instagram.ig.user.getIdByUsername(instagramAccount)
            .catch(() => {
                throw ApiError.BadRequest('Instagram account was not found')
            });

        return userId
    }

    async sendQRCode(qr, thread) {
        const buffer = new Buffer(qr.split(/,\s*/)[1],'base64');
        const output = await pngToJpeg({quality: 90})(buffer)
        await thread.broadcastPhoto({ file: output })
    }


    async downloadCSV() {
        const reservations = await ReservationModel.find()

        const fields = [{
            label: 'RESERVATION CODE',
            value: 'reservationCode'
        }, {
            label: 'RESERVEE NAME',
            value: 'reserveeName'
        }, {
            label: 'NUMBER OF PLACES',
            value: 'numberOfPlaces'
        }, {
            label: 'INSTAGRAM',
            value: 'instagramAccount'
        }, {
            label: 'COMMENT',
            value: 'comment'
        }]

        const json2csv = new Parser({ fields: fields })

        const csv = json2csv.parse(reservations)
        return csv
    }

    async deleteOne(id) {
        await ReservationModel.findByIdAndDelete(id)
        return 'DELETED'
    }

    async deleteAll() {
        await ReservationModel.deleteMany()
        return 'DELETED'
    }

    async getDashboardData() {
        const count = await ReservationModel.count()
        const arrayOfPlaces = await ReservationModel.distinct('numberOfPlaces')
        let totalPlaces = 0
        arrayOfPlaces?.forEach((num) => {
            totalPlaces += Number(num)
        })
        const obj = JSON.parse(fs.readFileSync('status.json', 'utf8'));
        return { reservationsNum: count, totalPlaces: totalPlaces, opened: obj.opened }
    }
}

module.exports = new ReservationService()