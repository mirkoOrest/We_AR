const Joi = require('joi');

const {findTaskValidator} = require('../../validators');
const {ErrorHandler} = require('../../error/');

module.exports = (req, res, next) => {
    try {
        const task = req.body;

        const {error} = Joi.validate(task, findTaskValidator);

        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400))
        }

        next();

    } catch (e) {
        res.render('error', {message: e.message})
    }
}
