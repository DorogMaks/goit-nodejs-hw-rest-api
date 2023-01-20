const Joi = require('joi');

const authUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org'] },
    })
    .required()
    .messages({
      'any.required': 'Missing required email field',
    }),

  password: Joi.string()
    .pattern(
      /^((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      '\\The password must contain lowercase and uppercase Latin letters, numbers, special characters\\'
    )
    .min(6)
    .max(32)
    .required()
    .messages({
      'any.required': 'Missing required password field',
    }),
});

module.exports = authUserSchema;
