const {responseStatusCodeEnum} = require('../../constants/');
const {customErrors, ErrorHandler} = require('../../error');
const {projectService} = require('../../services/');

module.exports = {
    createProject: async (req, res) => {
        try {
            const project = req.body;

            await projectService.createProject(project);

            res.sendStatus(responseStatusCodeEnum.CREATED)
        } catch (e) {
            res.render('error', {message: e.message})
        }
    },

    getByParams: async (req, res, next) => {
        try {
            const params = req.body;
            const {status} = req.body;

            const allProjects = await projectService.getAllProjects()

            if (!allProjects.length) {
                return next(new ErrorHandler(
                    customErrors.NOT_FOUND.message,
                    responseStatusCodeEnum.NOT_FOUND,
                    customErrors.NOT_FOUND.code
                ))
            }

            const findProject = await projectService.getProjectByParams(params);
            const findComplexProject = await projectService.getProjectByComplexParams(params)
            const avgStatus = await projectService.getAvgStatus(status);

            if (!findProject.length) {
                res.json(allProjects)
            } else if (!findComplexProject.length){
                res.json(findProject)
            } else {
                res.json({findComplexProject, avgStatus});
            }
        } catch (e) {
            next(e)
        }
    }
};
