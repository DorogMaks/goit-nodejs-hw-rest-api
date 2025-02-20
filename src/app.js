const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const { contactsRouter, usersRouter } = require('./routes/api');

const app = express();

const { NODE_ENV } = process.env;

const formatsLogger = NODE_ENV === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static('./public'));
app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message } || { message: 'Internal server error' });
});

module.exports = app;
