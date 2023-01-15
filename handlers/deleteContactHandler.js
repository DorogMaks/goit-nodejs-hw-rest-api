const { Contact } = require('../models/contact');
const { HttpError } = require('../helpers');

const deleteContactHandler = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    return next(new HttpError(404, 'Not found'));
  }

  await Contact.findByIdAndRemove(contactId);

  res.json({ message: 'Contact deleted' });
};

module.exports = deleteContactHandler;
