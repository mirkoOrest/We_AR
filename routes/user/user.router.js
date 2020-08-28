const {Router} = require('express');

const {userController} = require('../../controllers/');
const {
    findUserValidatorMiddleware,
    newUserValidatorMiddleware
} = require('../../middlewares');

const userRouter = Router();

userRouter.post('/',newUserValidatorMiddleware, userController.createUser);
userRouter.get('/',findUserValidatorMiddleware, userController.getByParams);

module.exports = userRouter;
