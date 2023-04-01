const { NOT_FOUND } = require('./Constans');

class NotFound extends Error {
  constructor() {
    super(NOT_FOUND, 'Пользователь не найден');
  }
}

module.exports = NotFound;
