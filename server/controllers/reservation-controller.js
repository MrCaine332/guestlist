const reservationService = require('../services/reservation-service')
const instagram = require('../instagram')
const ApiError = require("../exceptions/api-error")

class ReservationController {
    async createReservation(req, res, next) {
        try {
            const reservationData = await reservationService.create(req.body)

            const qr = await reservationService.generateQRCode(reservationData.reservationCode)
            return res.json({reservation: reservationData, qrCode: qr})
        } catch (e) {
            next(e)
        }
    }

    async updateReservation(req, res, next) {
        try {
            const { code } = req.params
            const reservationData = await reservationService.update(code, req.body)

            const qr = await reservationService.generateQRCode(reservationData.reservationCode)
            return res.json({reservation: reservationData, qrCode: qr})
        } catch (e) {
            next(e)
        }
    }

    async getReservation(req, res, next) {
        try {
            const { code } = req.params
            const reservationData = await reservationService.get(code)

            const qr = await reservationService.generateQRCode(reservationData.reservationCode)
            return res.json({ reservation: reservationData, qrCode: qr })
        } catch (e) {
            next(e)
        }
    }

    async getAllReservations(req, res, next) {
        try {
            if (req.user.role !== 'ADMIN') {
                return next(ApiError.ForbiddenError())
            }
            const data = await reservationService.getAll()
            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async getReservationsByPrAgent(req, res, next) {
        try {
            const { id } = req.params

            if (req.user._id !== id ) {
                return next(ApiError.ForbiddenError())
            }

            const data = await reservationService.getByPrAgentId(id)

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ReservationController()