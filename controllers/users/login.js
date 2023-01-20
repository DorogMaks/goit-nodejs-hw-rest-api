const bcrypt = require('bcrypt');
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

  res.json({
    token: isUserValid.token,
    user: {
      email: isUserValid.email,
      subscription: isUserValid.subscription,
    },
  });
};

module.exports = login;
