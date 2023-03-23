const AplicationError = require('./AplicationError');
const { BAD_REQUEST } = require('./Constans');

class CastError extends AplicationError {
  constructor() {
    super(BAD_REQUEST, 'Пользователь не найден');
  }
}

module.exports = CastError;
