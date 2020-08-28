const Joi = require('joi');

const {regexEnum} = require('../../constants/');

module.exports = Joi.object().keys({
    _id: Joi.string().trim().alphanum(),
    email: Joi.string().regex(regexEnum.EMAIL),
    name: Joi.string().trim().alphanum().min(2).max(60),
    surname: Joi.string().trim().alphanum().min(2).max(60),
})
