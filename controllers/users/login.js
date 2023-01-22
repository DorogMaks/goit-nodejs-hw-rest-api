const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { HttpError } = require('../../helpers');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const isUserValid = await User.findOne({ email });

  if (!isUserValid)
    return next(new HttpError(401, 'Email or password is wrong'));

  const isPasswordValid = await bcrypt.compare(password, isUserValid.password);

  if (!isPasswordValid)
    return next(new HttpError(401, 'Email or password is wrong'));

  const payload = { id: isUserValid._id };
  const { JWT_SECRET } = process.env;

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
  });

  const updatedUser = await User.findByIdAndUpdate(
    isUserValid._id,
    { token: token },
    { new: true }
  );

  res.json({
    token: updatedUser.token,
    user: {
      email: isUserValid.email,
      subscription: isUserValid.subscription,
    },
  });
};

module.exports = login;
