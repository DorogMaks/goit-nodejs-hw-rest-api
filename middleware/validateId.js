const { HttpError } = require('../helpers');

function validateId() {
  return (req, res, next) => {
    const { contactId } = req.params;
    if (contactId.length !== 24)
      return next(new HttpError(400, 'Id is invalid'));
    return next();
  };
}

module.exports = validateId;
