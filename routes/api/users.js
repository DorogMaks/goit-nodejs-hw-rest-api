const express = require('express');
const { validateBody, validateToken } = require('../../middleware');
const { authUserSchema } = require('../../schemas/joi/users');
const { asyncWrapper } = require('../../helpers');
const { signup, login, logout } = require('../../controllers/users');

const usersRouter = express.Router();

usersRouter.post('/signup', validateBody(authUserSchema), asyncWrapper(signup));
usersRouter.post('/login', validateBody(authUserSchema), asyncWrapper(login));
usersRouter.post('/logout', validateToken(), asyncWrapper(logout));

module.exports = usersRouter;
