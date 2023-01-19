const { model } = require('mongoose');
const { usersCollectionSchema } = require('../schemas/mongoose');

const User = model('contact', usersCollectionSchema);

module.exports = { User };
