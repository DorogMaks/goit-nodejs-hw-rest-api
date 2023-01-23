const { Contact } = require('../../models/contact');
const { HttpError } = require('../../helpers');

const getContactById = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;

  const contact = await Contact.findOne({
    owner: _id,
    _id: contactId,
  });

  if (!contact) {
    return next(new HttpError(404, 'Contact not found'));
  }

  res.json(contact);
};

module.exports = getContactById;
