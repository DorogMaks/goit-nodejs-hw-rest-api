const express = require('express');
const {
  getAllContactsHandler,
  getSomeContactHandler,
  postContactHandler,
  deleteContactHandler,
  putContactHandler,
} = require('../../controllers/contacts.controllers');
const { tryCatchWrapper } = require('../../helpers');

const router = express.Router();

router.get('/', tryCatchWrapper(getAllContactsHandler));

router.get('/:contactId', tryCatchWrapper(getSomeContactHandler));

router.post('/', tryCatchWrapper(postContactHandler));

router.delete('/:contactId', tryCatchWrapper(deleteContactHandler));

router.put('/:contactId', tryCatchWrapper(putContactHandler));

module.exports = router;
