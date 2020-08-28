const Joi = require('joi');

const {statusEnum} = require('../../constants/');

module.exports = Joi.string().trim().valid(Object.values(statusEnum)).required();

