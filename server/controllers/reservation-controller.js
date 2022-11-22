const reservationService = require('../services/reservation-service')
const instagram = require('../instagram')
const ApiError = require("../exceptions/api-error")

class ReservationController {

    async createReservation(req, res, next) {
        try {
            const reservationData = await reservationService.create(req.body)
            return res.json(reservationData)
        } catch (e) {
            next(e)
        }
    }

    async updateReservation(req, res, next) {
        try {
            const { id } = req.params
            const reservationData = await reservationService.update(id, req.body)

            return res.json({reservation: reservationData})
        } catch (e) {
            next(e)
        }
    }

    async getReservation(req, res, next) {
        try {
            const { id } = req.params
            const reservationData = await reservationService.get(id)

            const qr = await reservationService.generateQRCode(reservationData._id)
            return res.json({ reservation: reservationData, qrCode: qr })
        } catch (e) {
            next(e)
        }
    }

    async getReservationByCode(req, res, next) {
        try {
            const { code } = req.params
            const reservationData = await reservationService.getByCode(code)

            const qr = await reservationService.generateQRCode(reservationData._id)
            return res.json({ reservation: reservationData, qrCode: qr })
        } catch (e) {
            next(e)
        }
    }

    async getReservations(req, res, next) {
        try {
            const data = await reservationService.getAll()
            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async getReservationsByPrAgent(req, res, next) {
        try {
            const { id } = req.params

            if (req.user.id !== id ) {
                return next(ApiError.ForbiddenError())
            }

            const data = await reservationService.getByPrAgentId(id)
            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async downloadCSV(req, res, next) {
        try {
            const csv = await reservationService.downloadCSV()

            res.attachment('data.csv');
            return res.status(200).send(csv)
        } catch (e) {
            next(e)
        }
    }

    async deleteReservation(req, res, next) {
        try {
            const { id } = req.params
            const result = await reservationService.deleteOne(id)
            return res.json({ message: 'DELETED '})
        } catch (e) {
            next(e)
        }
    }

    async deleteReservations(req, res, next) {
        try {
            const result = await reservationService.deleteAll()
            return res.json({ message: 'DELETED_ALL '})
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new ReservationController()