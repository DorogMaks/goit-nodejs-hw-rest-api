const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  const verification = await User.findOne({ email });

  if (verification) return next(new HttpError(409, 'Email in use'));

  const savedUser = await User.create({ email, password });

  res.status(201).json({ user: savedUser });
};

module.exports = signup;
