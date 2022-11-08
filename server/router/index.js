const Router = require("express").Router
const router = new Router()
const { body } = require('express-validator')
const userController = require('../controllers/user-controller')
const reservationController = require('../controllers/reservation-controller')
const authMiddleware = require("../middlewares/auth-middleware")


/** User routes */
router.post('/registration',
    authMiddleware,
    body('password').isLength({ min: 8 }),
    userController.registration)

router.post("/login",
    userController.login)

router.post("/check",
    userController.check)

router.get('/users',
    authMiddleware,
    userController.getUsers)


/** Reservation routes */
router.post('/reservation',
    reservationController.createReservation)

router.post('/reservation/:code',
    reservationController.updateReservation)

router.get('/reservation/:code',
    reservationController.getReservation)

router.get('/reservations',
    authMiddleware,
    reservationController.getAllReservations)

router.get('/reservations/pr/:id',
    authMiddleware,
    reservationController.getReservationsByPrAgent)

module.exports = router