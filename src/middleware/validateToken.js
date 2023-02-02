const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

function validateToken() {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      return next(new HttpError(401, 'Not authorized'));
    }

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      const user = await User.findById(id);

      if (!user || user?.token !== token)
        return next(new HttpError(401, 'Not authorized'));

      req.user = user;
    } catch (error) {
      if (
        error.name === 'TokenExpiredError' ||
        error.name === 'JsonWebTokenError'
      ) {
        return next(new HttpError(401, 'Not authorized'));
      }
      return next(error);
    }

    next();
  };
}

module.exports = validateToken;
