const { Contact } = require('../../models/contact');
const { HttpError } = require('../../helpers');

const getContacts = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (favorite !== 'true') {
    const contacts = await Contact.find({ owner: _id }).skip(skip).limit(limit);

    if (!contacts.length) {
      return next(new HttpError(404, 'Contacts not found'));
    }

    return res.json(contacts);
  }

  const contacts = await Contact.find({ owner: _id, favorite: favorite })
    .skip(skip)
    .limit(limit);

  if (!contacts.length) {
    return next(new HttpError(404, 'Contacts not found'));
  }

  res.json(contacts);
};

module.exports = getContacts;
