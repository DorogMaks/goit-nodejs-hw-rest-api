const { HttpError } = require('../../helpers');
const { User } = require('../../models');

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const user = await User.findById(_id);

  if (!user || !user?.token) return next(new HttpError(401, 'Not authorized'));

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription: subscription },
    { new: true }
  );

  res.json({
    email: user.email,
    subscription: updatedUser.subscription,
  });
};

module.exports = updateSubscription;
