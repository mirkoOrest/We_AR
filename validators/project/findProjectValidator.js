const Joi = require('joi');

const {statusEnum} = require('../../constants');

module.exports = Joi.object().keys({
    name: Joi.string().trim().alphanum().min(1).max(60),
    author_id: Joi.string().trim().alphanum(),
    participants: Joi.array().items(Joi.string().trim().alphanum().min(1).max(100)),
    status: Joi.string().trim().valid(Object.values(statusEnum)),
    text: Joi.string().alphanum().min(1).max(1000),
    integer: Joi.number().min(1).max(5)
})
