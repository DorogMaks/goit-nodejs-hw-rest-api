const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const getUserData = require('./getUserData');
const updateSubscription = require('./updateSub');
const uploadAvatar = require('./uploadAvatar');
const userVerification = require('./userVerification');
const sendVerification = require('./sendVerification');

module.exports = {
  signup,
  login,
  logout,
  getUserData,
  updateSubscription,
  uploadAvatar,
  userVerification,
  sendVerification,
};
