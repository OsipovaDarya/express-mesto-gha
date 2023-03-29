const jwt = require('jsonwebtoken');
const AuthorizedError = require('../errors/AuthorizedError');

const { JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startWith('Bearer')) {
    next(new AuthorizedError('Необходима авторизация'));
    return;
  }
  let payload;
  const token = authorization.replace('Bearer ', '');
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthorizedError('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
};
