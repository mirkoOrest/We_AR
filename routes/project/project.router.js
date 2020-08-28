const {Router} = require('express');

const {projectController} = require('../../controllers/');
const {
    findProjectValidatorMiddleware,
    newProjectValidatorMiddleware,
} = require('../../middlewares');

const projectRouter = Router();

projectRouter.post('/', newProjectValidatorMiddleware, projectController.createProject);
projectRouter.get('/', findProjectValidatorMiddleware, projectController.getByParams);

module.exports = projectRouter;
