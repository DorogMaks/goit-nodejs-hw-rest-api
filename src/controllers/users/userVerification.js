const { HttpError } = require('../../helpers');
const { User } = require('../../models');

const userVerification = async (req, res, next) => {
  const { verificationToken } = req.params;
  const isUserValid = await User.findOne({ verificationToken });

  if (!isUserValid) return next(new HttpError(404, 'User not found'));

  await User.findByIdAndUpdate(
    isUserValid._id,
    { verify: true, verificationToken: null },
    { new: true }
  );

  res.json({
    message: 'Verification successful',
  });
};

module.exports = userVerification;
