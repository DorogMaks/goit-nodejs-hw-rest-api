const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');

function validateId() {
  return (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId))
      return next(new HttpError(400, 'Id is invalid'));
    return next();
  };
}

module.exports = validateId;
