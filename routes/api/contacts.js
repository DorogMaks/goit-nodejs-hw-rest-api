const express = require('express');
const {
  getAllContactsHandler,
  getSomeContactHandler,
  postContactHandler,
  deleteContactHandler,
  putContactHandler,
} = require('../../controllers/contacts.controllers');
const { tryCatchWrapper, validateBody } = require('../../helpers');
const { contactsSchema } = require('../../schemas/contacts');

const router = express.Router();

router.get('/', tryCatchWrapper(getAllContactsHandler));

router.get('/:contactId', tryCatchWrapper(getSomeContactHandler));

router.post(
  '/',
  validateBody(contactsSchema),
  tryCatchWrapper(postContactHandler)
);

router.delete('/:contactId', tryCatchWrapper(deleteContactHandler));

router.put(
  '/:contactId',
  validateBody(contactsSchema),
  tryCatchWrapper(putContactHandler)
);

module.exports = router;
