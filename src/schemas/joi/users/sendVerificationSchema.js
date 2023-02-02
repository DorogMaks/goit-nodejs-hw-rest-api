const Joi = require('joi');

const sendVerificationSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({ 'any.required': 'Missing required email field' }),
});

module.exports = sendVerificationSchema;
