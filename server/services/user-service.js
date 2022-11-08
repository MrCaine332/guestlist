const UserModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const ApiError = require("../exceptions/api-error")
const jwt = require("jsonwebtoken");

class UserService {

    async registration(username, password, name) {
        const candidate = await UserModel.findOne({ username })
        if (candidate) {
            throw ApiError.BadRequest(`User with username ${username} already exists`)
        }

        const hashPassword = await bcrypt.hash(password, 3)

        const user = await UserModel.create({ username, password: hashPassword, name })

        return user
    }

    async login(username, password) {
        const user = await UserModel.findOne({ username })
        if (!user) {
            throw ApiError.BadRequest("Wrong username or password")
        }
        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if (!isPasswordEqual) {
            throw ApiError.BadRequest("Wrong username or password")
        }

        user.lastLogin = new Date()
        await user.save()

        const accessToken = jwt.sign({
                _id: user._id,
                username: user.username,
                role: user.role,
            }, process.env.JWT_SECRET, {expiresIn: "30m"})

        return { accessToken, user }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    async getAll() {
        const users = await UserModel.find()
        return users
    }
}

module.exports = new UserService()