const { NOT_FOUND } = require('./Constans');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFound;
