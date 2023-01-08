function tryCatchWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(httpError(400, error.message));
    }
    return next();
  };
}

module.exports = {
  tryCatchWrapper,
  httpError,
  validateBody,
};
