const express = require('express');
const { validateBody } = require('../../middleware');
const { postUserSchema } = require('../../schemas/joi/users');
const { asyncWrapper } = require('../../helpers');
const { signup } = require('../../controllers/users');

const usersRouter = express.Router();

usersRouter.post('/signup', validateBody(postUserSchema), asyncWrapper(signup));

module.exports = usersRouter;
