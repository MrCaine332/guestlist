const {validationResult} = require("express-validator");
const userService = require('../services/user-service')
const ApiError = require("../exceptions/api-error")

class UserController {

    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation error", errors.array()))
            }

            const { username, password, name } = req.body
            const userData = await userService.registration(username, password, name)

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { username, password } = req.body
            const userData = await userService.login(username, password)

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async check(req, res, next) {
        try {
            const { accessToken } = req.body
            const data = await userService.validateAccessToken(accessToken)

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            if (req.user.role !== 'ADMIN') {
                return next(ApiError.ForbiddenError())
            }
            const data = await userService.getAll()

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()