const {Router} = require('express');

const {taskController} = require('../../controllers/');
const {
    findTaskValidatorMiddleware,
    newTaskValidatorMiddleware
} = require('../../middlewares');

const taskRouter = Router();

taskRouter.post('/', newTaskValidatorMiddleware, taskController.createTask);
taskRouter.get('/', findTaskValidatorMiddleware, taskController.getByParams);

module.exports = taskRouter;
