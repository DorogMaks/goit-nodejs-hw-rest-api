const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../models/contacts');
const { httpError } = require('../helpers');

const getAllContactsHandler = async (req, res, next) => {
  const contacts = await listContacts();

  if (!contacts.length) {
    return next(httpError(404, 'Contacts not found'));
  }

  res.json(contacts);
};

const getSomeContactHandler = async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);

  if (!contact) {
    return next(httpError(404, 'Contact not found'));
  }

  res.json(contact);
};

const postContactHandler = async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return next(httpError(400, 'Missing required name field'));
  }

  const newContact = await addContact(req.body);

  res.status(201).json(newContact);
};

const deleteContactHandler = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    return next(httpError(404, 'Not found'));
  }

  await removeContact(contactId);

  res.json({ message: 'Contact deleted' });
};

const putContactHandler = async (req, res, next) => {
  const { contactId } = req.params;

  if (!Object.keys(req.body).length) {
    return next(httpError(400, 'Missing fields'));
  }

  const updatedContact = await updateContact(contactId, req.body);

  if (!updatedContact) {
    return next(httpError(404, 'Not found'));
  }

  res.json(updatedContact);
};

module.exports = {
  getAllContactsHandler,
  getSomeContactHandler,
  postContactHandler,
  deleteContactHandler,
  putContactHandler,
};
