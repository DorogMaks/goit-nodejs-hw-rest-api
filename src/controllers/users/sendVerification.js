const { HttpError, sendMail } = require('../../helpers');
const { User } = require('../../models');

const sendVerification = async (req, res, next) => {
  const { email } = req.body;

  const isUserValid = await User.findOne({ email });

  if (!isUserValid) return next(new HttpError(404, 'User not found'));

  const { verify, verificationToken } = isUserValid;

  if (verify)
    return next(new HttpError(400, 'Verification has already been passed'));

  await sendMail({ email, verificationToken });

  res.json({
    message: 'Verification email sent',
  });
};

module.exports = sendVerification;
