const express = require('express');
const { validateBody } = require('../../middleware');
const { authUserSchema } = require('../../schemas/joi/users');
const { asyncWrapper } = require('../../helpers');
const { signup, login } = require('../../controllers/users');

const usersRouter = express.Router();

usersRouter.post('/signup', validateBody(authUserSchema), asyncWrapper(signup));
usersRouter.post('/login', validateBody(authUserSchema), asyncWrapper(login));

module.exports = usersRouter;
