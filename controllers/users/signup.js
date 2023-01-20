const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  const verification = await User.findOne({ email });

  if (verification) return next(new HttpError(409, 'Email in use'));

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const savedUser = await User.create({ email, password: hashedPassword });

  res.status(201).json({ user: savedUser });
};

module.exports = signup;
