const Joi = require('joi');

const updateSubSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

module.exports = updateSubSchema;
