module.exports = class UserDto {
    _id;
    username;
    name;
    surname;
    role;

    constructor(model) {
        this._id = model._id;
        this.username = model.username;
        this.name = model.name;
        this.surname = model.surname;
        this.role = model.role;
    }
}
