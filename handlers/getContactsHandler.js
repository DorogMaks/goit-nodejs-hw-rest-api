const { Contact } = require('../models/contact');
const { HttpError } = require('../helpers');

const getContactsHandler = async (req, res, next) => {
  const contacts = await Contact.find({});

  if (!contacts.length) {
    return next(new HttpError(404, 'Contacts not found'));
  }

  res.json(contacts);
};

module.exports = getContactsHandler;
