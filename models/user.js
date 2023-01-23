const { model } = require('mongoose');
const { usersCollectionSchema } = require('../schemas/mongoose');

const User = model('user', usersCollectionSchema);

module.exports = { User };
