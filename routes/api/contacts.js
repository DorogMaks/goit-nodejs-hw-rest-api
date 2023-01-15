const express = require('express');
const {
  getContactsHandler,
  getContactHandler,
  postContactHandler,
  deleteContactHandler,
  updateContactHandler,
} = require('../../controllers/contacts.controllers');
const { tryCatchWrapper, validateBody } = require('../../helpers');
const {
  postContactSchema,
  putContactSchema,
  updateStatusContactSchema,
} = require('../../schemas/joi');

const router = express.Router();

router.get('/', tryCatchWrapper(getContactsHandler));

router.get('/:contactId', tryCatchWrapper(getContactHandler));

router.post(
  '/',
  validateBody(postContactSchema),
  tryCatchWrapper(postContactHandler)
);

router.delete('/:contactId', tryCatchWrapper(deleteContactHandler));

router.put(
  '/:contactId',
  validateBody(putContactSchema),
  tryCatchWrapper(updateContactHandler)
);

router.patch(
  '/:contactId/favorite',
  validateBody(updateStatusContactSchema),
  tryCatchWrapper(updateContactHandler)
);

module.exports = router;
