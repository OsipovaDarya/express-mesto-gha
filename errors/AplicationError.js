const { INTERNAL_SERVERE_ERROR } = require('./Constans');

class AplicationError extends Error {
  constructor(status = INTERNAL_SERVERE_ERROR, message = 'Внутрення ошибка') {
    super();
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AplicationError;
