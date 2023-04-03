const { INTERNAL_SERVERE_ERROR } = require('./Constans');

class AplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'internalServereError';
    this.statusCode = INTERNAL_SERVERE_ERROR;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AplicationError;
