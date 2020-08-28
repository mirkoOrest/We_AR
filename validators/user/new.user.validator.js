const Joi = require('joi');

const {regexEnum} = require('../../constants/');

module.exports = Joi.object().keys({
    email: Joi.string().regex(regexEnum.EMAIL).required(),
    name: Joi.string().trim().alphanum().min(2).max(60).required(),
    surname: Joi.string().trim().alphanum().min(2).max(60).required(),
    projectIds: Joi.array().items(Joi.string().trim().alphanum().min(1).max(100)),
    taskIds: Joi.array().items(Joi.string().trim().alphanum().min(1).max(100))

})
