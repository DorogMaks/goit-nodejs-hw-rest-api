const express = require('express');
const { validateId, validateBody } = require('../../middleware');
const {
  postContactSchema,
  putContactSchema,
  updateStatusContactSchema,
} = require('../../schemas/joi/contacts');
const { asyncWrapper } = require('../../helpers');
const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  updateContact,
} = require('../../controllers/contacts');

const contactsRouter = express.Router();

contactsRouter.get('/', asyncWrapper(getContacts));

contactsRouter.get('/:contactId', validateId(), asyncWrapper(getContactById));

contactsRouter.post(
  '/',
  validateBody(postContactSchema),
  asyncWrapper(postContact)
);

contactsRouter.delete('/:contactId', validateId(), asyncWrapper(deleteContact));

contactsRouter.put(
  '/:contactId',
  validateId(),
  validateBody(putContactSchema),
  asyncWrapper(updateContact)
);

contactsRouter.patch(
  '/:contactId/favorite',
  validateId(),
  validateBody(updateStatusContactSchema),
  asyncWrapper(updateContact)
);

module.exports = contactsRouter;
