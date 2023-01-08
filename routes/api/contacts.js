const express = require('express');
const {
  getContactsHandler,
  getContactHandler,
  postContactHandler,
  deleteContactHandler,
  putContactHandler,
} = require('../../controllers/contacts.controllers');
const { tryCatchWrapper, validateBody } = require('../../helpers');
const {
  postContactSchema,
  putContactSchema,
} = require('../../schemas/contacts');

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
  tryCatchWrapper(putContactHandler)
);

module.exports = router;
