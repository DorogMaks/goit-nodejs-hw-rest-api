const express = require('express');
const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  updateContact,
} = require('../../controllers');
const { validateId, validateBody } = require('../../middleware');
const { asyncWrapper } = require('../../helpers');
const {
  postContactSchema,
  putContactSchema,
  updateStatusContactSchema,
} = require('../../schemas/joi');

const router = express.Router();

router.get('/', asyncWrapper(getContacts));

router.get('/:contactId', validateId(), asyncWrapper(getContactById));

router.post('/', validateBody(postContactSchema), asyncWrapper(postContact));

router.delete('/:contactId', validateId(), asyncWrapper(deleteContact));

router.put(
  '/:contactId',
  validateId(),
  validateBody(putContactSchema),
  asyncWrapper(updateContact)
);

router.patch(
  '/:contactId/favorite',
  validateId(),
  validateBody(updateStatusContactSchema),
  asyncWrapper(updateContact)
);

module.exports = router;
