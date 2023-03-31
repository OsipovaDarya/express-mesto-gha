const { NOT_FOUND } = require('./Constans');

class UserNotFound extends Error {
  constructor() {
    super(NOT_FOUND, 'Пользователь не найден');
  }
}

module.exports = UserNotFound;
