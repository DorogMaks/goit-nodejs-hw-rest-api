const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string()
    .pattern(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .min(3)
    .max(30)
    .required()
    .messages({
      'any.required': 'You should provide name',
    }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'org'] },
    })
    .required()
    .messages({
      'any.required': 'You should provide email',
    }),
  phone: Joi.string()
    .pattern(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .messages({
      'any.required': 'You should provide phone number',
    }),
});

module.exports = { contactsSchema };
