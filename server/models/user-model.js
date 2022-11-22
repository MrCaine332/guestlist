const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true,},
    surname: {type: String, default: '' },
    role: {type: String, default: 'PR_AGENT' },
    lastLogin: {type: Date, default: new Date()},
    createdAt: {type: Date, default: new Date()},
    updatedAt: {type: Date, default: new Date()},
})

module.exports =  model("User", UserSchema)