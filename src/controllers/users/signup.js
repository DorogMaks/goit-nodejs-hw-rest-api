const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { v4 } = require('uuid');
const { User } = require('../../models');
const { HttpError, sendMail } = require('../../helpers');

const signup = async (req, res, next) => {
  const { email, password } = req.body;

  const verification = await User.findOne({ email });

  if (verification) return next(new HttpError(409, 'Email in use'));

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const url = gravatar.url(email, { s: '250' }, false);

  const verificationToken = v4();

  const savedUser = await User.create({
    email,
    password: hashedPassword,
    avatarURL: url,
    verificationToken,
  });

  await sendMail({ email, verificationToken });

  res.status(201).json({ user: savedUser });
};

module.exports = signup;
