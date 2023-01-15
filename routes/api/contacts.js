const express = require('express');
const {
  getContactsHandler,
  getContactHandler,
  postContactHandler,
  deleteContactHandler,
  updateContactHandler,
} = require('../../controllers/contacts.controllers');
const { validateId, validateBody } = require('../../middleware');
const { asyncWrapper } = require('../../helpers');
const {
  postContactSchema,
  putContactSchema,
  updateStatusContactSchema,
} = require('../../schemas/joi');

const router = express.Router();

router.get('/', asyncWrapper(getContactsHandler));

router.get('/:contactId', validateId(), asyncWrapper(getContactHandler));

router.post(
  '/',
  validateBody(postContactSchema),
  asyncWrapper(postContactHandler)
);

router.delete('/:contactId', validateId(), asyncWrapper(deleteContactHandler));

router.put(
  '/:contactId',
  validateId(),
  validateBody(putContactSchema),
  asyncWrapper(updateContactHandler)
);

router.patch(
  '/:contactId/favorite',
  validateId(),
  validateBody(updateStatusContactSchema),
  asyncWrapper(updateContactHandler)
);

module.exports = router;
