const { Contact } = require('../../models/contact');
const { HttpError } = require('../../helpers');

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    return next(new HttpError(404, 'Contact not found'));
  }

  res.json(contact);
};

module.exports = getContactById;
