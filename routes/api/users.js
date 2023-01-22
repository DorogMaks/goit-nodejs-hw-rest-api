const express = require('express');
const { validateBody, validateToken } = require('../../middleware');
const { authUserSchema, updateSubSchema } = require('../../schemas/joi/users');
const { asyncWrapper } = require('../../helpers');
const {
  signup,
  login,
  logout,
  current,
  updateSubscription,
} = require('../../controllers/users');

const usersRouter = express.Router();

usersRouter.post('/signup', validateBody(authUserSchema), asyncWrapper(signup));
usersRouter.post('/login', validateBody(authUserSchema), asyncWrapper(login));
usersRouter.post('/logout', validateToken(), asyncWrapper(logout));
usersRouter.post('/current', validateToken(), asyncWrapper(current));
usersRouter.patch(
  '/',
  validateToken(),
  validateBody(updateSubSchema),
  asyncWrapper(updateSubscription)
);

module.exports = usersRouter;
