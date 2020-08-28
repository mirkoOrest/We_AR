const {responseStatusCodeEnum} = require('../../constants/');
const {customErrors ,ErrorHandler} = require('../../error');
const {taskService} = require('../../services/');

module.exports = {
    createTask: async (req, res) => {
        try {
            const task = req.body;

            await taskService.createTask(task);

            res.sendStatus(responseStatusCodeEnum.CREATED)
        } catch (e) {
            res.render('error', {message: e.message})
        }
    },

    getByParams: async (req, res, next) => {
        try {
            const params = req.body;

            const allTasks = await taskService.getTasks();

            if (!allTasks.length) {
                return next(new ErrorHandler(
                    customErrors.NOT_FOUND.message,
                    responseStatusCodeEnum.NOT_FOUND,
                    customErrors.NOT_FOUND.code
                ))
            }

            const findTask = await taskService.getTaskByParams(params);
            const findComplexTask = await taskService.getTaskByComplexParams(params)

            if (!findTask.length) {
                res.json(allTasks)
            } else if (!findComplexTask.length){
                res.json(findTask)
            } else {
                res.json(findComplexTask);
            }
        } catch (e) {
            next(e)
        }
    }
};
