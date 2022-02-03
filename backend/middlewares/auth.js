const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

function auth(req, res, next) {
  const token = req.cookies.jwt;
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!token) {
    throw new AuthError('Необходимо авторизоваться.');
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    throw new AuthError('Необходимо авторизоваться.');
  }

  req.user = payload;

  return next();
}

module.exports = { auth };
