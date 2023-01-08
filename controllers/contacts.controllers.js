const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../models/contacts');
const { HttpError } = require('../helpers');

const getContactsHandler = async (req, res, next) => {
  const contacts = await listContacts();

  if (!contacts.length) {
    return next(new HttpError(404, 'Contacts not found'));
  }

  res.json(contacts);
};

const getContactHandler = async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);

  if (!contact) {
    return next(new HttpError(404, 'Contact not found'));
  }

  res.json(contact);
};

const postContactHandler = async (req, res, next) => {
  const newContact = await addContact(req.body);

  res.status(201).json(newContact);
};

const deleteContactHandler = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    return next(new HttpError(404, 'Not found'));
  }

  await removeContact(contactId);

  res.json({ message: 'Contact deleted' });
};

const putContactHandler = async (req, res, next) => {
  const { contactId } = req.params;

  const updatedContact = await updateContact(contactId, req.body);

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
