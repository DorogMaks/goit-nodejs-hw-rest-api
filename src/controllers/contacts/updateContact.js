const { Contact } = require('../../models/contact');
const { HttpError } = require('../../helpers');

const updateContact = async (req, res, next) => {
  const { _id } = req.user;
  const { contactId } = req.params;

  const updatedContact = await Contact.findOneAndUpdate(
    {
      owner: _id,
      _id: contactId,
    },
    { new: true }
  );

  if (!updatedContact) {
    return next(new HttpError(404, 'Not found'));
  }

  res.json(updatedContact);
};

module.exports = updateContact;
