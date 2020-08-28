const {customErrors, ErrorHandler} = require('../../error');
const {responseStatusCodeEnum} = require('../../constants/');
const {userService} = require('../../services/');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const user = req.body;

            await userService.createUser(user);

            res.sendStatus(responseStatusCodeEnum.CREATED)
        } catch (e) {
            res.render('error', {message: e.message})
        }
    },

    getByParams: async (req, res, next) => {
        try {
            const user = req.body

            const allUsers = await userService.getUsers();

            if (!allUsers.length) {
                return next(new ErrorHandler(
                    customErrors.NOT_FOUND.message,
                    responseStatusCodeEnum.NOT_FOUND,
                    customErrors.NOT_FOUND.code
                ))
            }
            const findUser = await userService.getUserByParams(user);

            if (!findUser.length) {
                res.json(allUsers)
            } else {
                res.json(findUser)
            }
        } catch (e) {
            next(e)
        }
    }
};
