const express = require('express');
const {
  getAllContactsHandler,
  getSomeContactHandler,
  postContactHandler,
  deleteContactHandler,
  putContactHandler,
} = require('../../controllers/contacts.controllers');

const router = express.Router();

router.get('/', getAllContactsHandler);

router.get('/:contactId', getSomeContactHandler);

router.post('/', postContactHandler);

router.delete('/:contactId', deleteContactHandler);

router.put('/:contactId', putContactHandler);

module.exports = router;
