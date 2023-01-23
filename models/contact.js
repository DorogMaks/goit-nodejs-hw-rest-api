const { model } = require('mongoose');
const { contactsCollectionSchema } = require('../schemas/mongoose');

const Contact = model('contact', contactsCollectionSchema);

module.exports = { Contact };
