const Joi = require('joi');

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    'any.required': 'Mmissing field favorite',
  }),
});

module.exports = updateStatusContactSchema;
