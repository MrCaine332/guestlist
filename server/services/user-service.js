const UserModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const ApiError = require("../exceptions/api-error")
const tokenService = require('../services/token-service')
const UserDto = require('../dtos/user-dto')

class UserService {
    async login(username, password) {
        const user = await UserModel.findOne({ username })
        if (!user) {
            throw ApiError.BadRequest("Wrong username or password")
        }
        const isPasswordEquals = await bcrypt.compare(password, user.password)
        if (!isPasswordEquals) {
            throw ApiError.BadRequest("Wrong username or password")
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({
            _id: userDto._id, username: userDto.username, role: userDto.role
        });
        await tokenService.saveToken(userDto._id, tokens.refreshToken);

        user.lastLogin = new Date()
        await user.save()

        return { ...tokens, user: userDto }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData._id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({
            _id: userDto._id, username: userDto.username, role: userDto.role
        });

        await tokenService.saveToken(userDto._id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async create(body) {
        const candidate = await UserModel.findOne({ username: body.username })
        if (candidate) {
            throw ApiError.BadRequest(`User with username ${body.username} already exists`)
        }

        const hashPassword = await bcrypt.hash(body.password, 3)

        const user = await UserModel.create({
            username: body.username,
            password: hashPassword,
            name: body.name,
            surname: body.surname,
            role: body.role,
            lastLogin: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        return user
    }

    async update(id, body) {
        const candidate = await UserModel.findById(id)
        if (candidate.role === 'ADMIN')
            throw ApiError.BadRequest("Admin accounts cannot be deleted")

        await UserModel.updateOne({ _id: id }, {...body, updatedAt: new Date()})
        const user = await UserModel.findById(id)
        return user
    }

    async get() {
        const users = await UserModel.find({}, '-password')
        return users
    }

    async deleteOne(id) {
        const candidate = await UserModel.findById(id)
        if (candidate.role === 'ADMIN')
            throw ApiError.BadRequest("Admin accounts cannot be deleted")

        await UserModel.findByIdAndDelete(id)

        return 'DELETED'
    }

    async deleteAll() {
        await UserModel.deleteMany({ role: 'PR_AGENT' || 'CHECKER' })
        return 'DELETED_ALL'
    }
}

module.exports = new UserService()