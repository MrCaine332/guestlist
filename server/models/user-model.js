const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true,},
    surname: {type: String, default: '' },
    role: {type: String, default: 'PR_AGENT' },
    lastLogin: {type: Date, default: new Date().toISOString()},
    createdAt: {type: Date, default: new Date().toISOString()},
    updatedAt: {type: Date, default: new Date().toISOString()},
})

module.exports =  model("User", UserSchema)