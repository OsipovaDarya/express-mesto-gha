const { FORDBIDDEN } = require('./Constans');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORDBIDDEN;
  }
}

module.exports = Forbidden;
