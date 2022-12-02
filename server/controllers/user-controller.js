const {validationResult} = require("express-validator");
const userService = require('../services/user-service')
const ApiError = require("../exceptions/api-error")

class UserController {
    async login(req, res, next) {
        try {
            const { username, password } = req.body
            const userData = await userService.login(username, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json();
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async create(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation error", errors.array()))
            }

            const userData = await userService.create(req.body)

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const userData = await userService.update(id, req.body)

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async updatePassword(req, res, next) {
        try {
            const { id } = req.params
            const userData = await userService.updatePassword(id, req.body.password)

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async get(req, res, next) {
        try {
            const data = await userService.get()
            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params
            const result = await userService.deleteOne(id)

            return res.json({ message: 'DELETED_ACCOUNT' })
        } catch (e) {
            next(e)
        }
    }

    async deleteAll(req, res, next) {
        try {
            const result = await userService.deleteAll()

            return res.json({ message: 'DELETED_ALL_ACCOUNTS' })
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new UserController()