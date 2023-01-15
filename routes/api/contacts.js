const express = require('express');
const {
  getContactsHandler,
  getContactHandler,
  postContactHandler,
  deleteContactHandler,
  updateContactHandler,
} = require('../../controllers/contacts.controllers');
const { asyncWrapper } = require('../../helpers');
const validateBody = require('../../middleware/validateBody');
const {
  postContactSchema,
  putContactSchema,
  updateStatusContactSchema,
} = require('../../schemas/joi');

const router = express.Router();

router.get('/', asyncWrapper(getContactsHandler));

router.get('/:contactId', asyncWrapper(getContactHandler));

router.post(
  '/',
  validateBody(postContactSchema),
  asyncWrapper(postContactHandler)
);

router.delete('/:contactId', asyncWrapper(deleteContactHandler));

router.put(
  '/:contactId',
  validateBody(putContactSchema),
  asyncWrapper(updateContactHandler)
);

router.patch(
  '/:contactId/favorite',
  validateBody(updateStatusContactSchema),
  asyncWrapper(updateContactHandler)
);

module.exports = router;
