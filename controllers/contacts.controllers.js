const { Contact } = require('../models/contact');
const { HttpError } = require('../helpers');

const getContactsHandler = async (req, res, next) => {
  const contacts = await Contact.find({});

  if (!contacts.length) {
    return next(new HttpError(404, 'Contacts not found'));
  }

  res.json(contacts);
};

const getContactHandler = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    return next(new HttpError(404, 'Contact not found'));
  }

  res.json(contact);
};

const postContactHandler = async (req, res, next) => {
  const newContact = await Contact.create(req.body);

  res.status(201).json(newContact);
};

const deleteContactHandler = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    return next(new HttpError(404, 'Not found'));
  }

  await Contact.findByIdAndRemove(contactId);

  res.json({ message: 'Contact deleted' });
};

const putContactHandler = async (req, res, next) => {
  const { contactId } = req.params;

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!updatedContact) {
    return next(new HttpError(404, 'Not found'));
  }

  res.json(updatedContact);
};

module.exports = {
  getContactsHandler,
  getContactHandler,
  postContactHandler,
  deleteContactHandler,
  putContactHandler,
};
