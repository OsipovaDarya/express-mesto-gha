const AplicationError = require('./AplicationError');
const { NOT_FOUND } = require('./Constans');

class UserNotFound extends AplicationError {
  constructor() {
    super(NOT_FOUND, 'Пользователь не найден');
  }
}

module.exports = UserNotFound;
