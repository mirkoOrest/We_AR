const Joi = require('joi');

const statusEnum = require('../../constants/status.enum');

module.exports = Joi.object().keys({
    name: Joi.string().trim().alphanum().min(1).max(60).required(),
    author: Joi.string().trim().alphanum().required(),
    participants: Joi.array().items(Joi.string().trim().alphanum().min(1).max(100)),
    description: Joi.object().keys({
        text: Joi.string().alphanum().min(1).max(1000).required(),
        integer: Joi.number().min(1).max(5).required(),
        status: Joi.string().trim().valid(Object.values(statusEnum))
    })

})
