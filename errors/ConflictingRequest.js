const { CONFLICTING_REQUEST } = require('./Constans');

class ConflictingRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICTING_REQUEST;
  }
}

module.exports = ConflictingRequest;
