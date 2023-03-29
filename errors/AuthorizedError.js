const { UNAUTHORIZED } = require('./Constans');

class AuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = AuthorizedError;
