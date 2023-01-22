const { Contact } = require('../../models/contact');
const { HttpError } = require('../../helpers');

const deleteContact = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;

  const contact = await Contact.findOneAndRemove({
    owner: _id,
    _id: contactId,
  });

  if (!contact) {
    return next(new HttpError(404, 'Not found'));
  }

  res.json({ message: 'Contact deleted' });
};

module.exports = deleteContact;
