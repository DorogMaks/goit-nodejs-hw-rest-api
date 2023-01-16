const { model } = require('mongoose');
const schema = require('../schemas/mongoose/contactsCollectionSchema');

const Contact = model('contact', schema);

module.exports = { Contact };
