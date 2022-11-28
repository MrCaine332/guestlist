const Router = require("express").Router
const router = new Router()
const { body } = require('express-validator')
const userController = require('../controllers/user-controller')
const reservationController = require('../controllers/reservation-controller')
const authMiddleware = require("../middlewares/auth-middleware")

/** =========== */
/** User routes */
/** =========== */

router.post('/login',
    userController.login)

router.post('/logout',
    userController.logout)

router.get('/refresh',
    // authMiddleware(['ADMIN', 'PR_AGENT', 'CHECKER']),
    userController.refresh);

router.post('/account',
    authMiddleware(['ADMIN']),
    body('password').isLength({ min: 8 }),
    userController.create)

router.post('/account/:id',
    authMiddleware(['ADMIN']),
    userController.update)

router.get('/accounts',
    authMiddleware(['ADMIN']),
    userController.get)

router.delete('/account/:id',
    authMiddleware(['ADMIN']),
    userController.deleteOne)

router.delete('/accounts',
    authMiddleware(['ADMIN']),
    userController.deleteAll)

/** =========================================== */

/** ================== */
/** Reservation routes */
/** ================== */

router.post('/reservation',
    reservationController.createReservation)

router.post('/reservation/:id',
    authMiddleware(['ADMIN', 'PR_AGENT']),
    reservationController.updateReservation)

router.get('/reservation/:id',
    reservationController.getReservation)

router.get('/reservation/code/:code',
    reservationController.getReservationByCode)

router.get('/reservations',
    authMiddleware(['ADMIN']),
    reservationController.getReservations)

router.get('/reservations/pr/:id',
    authMiddleware(['ADMIN', 'PR_AGENT']),
    reservationController.getReservationsByPrAgent)

router.get('/reservations/download',
    authMiddleware(['ADMIN']),
    reservationController.downloadCSV)

router.delete('/reservation/:id',
    authMiddleware(['ADMIN', 'PR_AGENT']),
    reservationController.deleteReservation)

router.delete('/reservations',
    authMiddleware(['ADMIN']),
    reservationController.deleteReservations)

/** =========================================== */

router.post('/system/toggle',
    authMiddleware(['ADMIN']),
    reservationController.openCloseReservations)

router.get('/dashboard',
    authMiddleware(['ADMIN', 'PR_AGENT']),
    reservationController.getDashboardData)

module.exports = router