const {UserModel} = require('../../dataBase');

module.exports = {
    createUser: (user) => {
        const userToCreate = new UserModel(user);

        return userToCreate.save();
    },

    getUsers: () => {
        return UserModel.find({});
    },

    getUserByParams: (user) => {
        const {_id, name, surname, email} = user;

        return UserModel.find({$or: [{_id}, {name}, {surname}, {email}]})
    }
};
