const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);

  if (!contact) {
    return next(res.status(404).json({ message: 'Contact not found' }));
  }

  res.json(contact);
});

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return next(
      res.status(400).json({ message: 'Missing required name field' })
    );
  }

  const newContact = await addContact(req.body);

  res.status(201).json(newContact);
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);
  if (!contact) {
    return next(res.status(404).json({ message: 'Not found' }));
  }
  await removeContact(contactId);

  res.json({ message: 'Contact deleted' });
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;

  if (!Object.keys(req.body).length) {
    return next(res.status(400).json({ message: 'Missing fields' }));
  }

  const updatedContact = await updateContact(contactId, req.body);

  if (!updatedContact) {
    return next(res.status(404).json({ message: 'Not found' }));
  }

  res.json(updatedContact);
});

module.exports = router;
