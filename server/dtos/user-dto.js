module.exports = class UserDto {
    id;
    username;
    name;
    surname;
    role;

    constructor(model) {
        this.id = model._id;
        this.username = model.username;
        this.name = model.name;
        this.surname = model.surname;
        this.role = model.role;
    }
}
