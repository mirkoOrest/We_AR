const Joi = require('joi');

const {newProjectValidator} = require('../../validators');
const {ErrorHandler} = require('../../error/');

module.exports = (req, res, next) => {
    try {
        const project = req.body;

        const {error} = Joi.validate(project, newProjectValidator);

        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400))
        }

        next();

    } catch (e) {
        res.render('error', {message: e.message})
    }
}
