const { INTERNAL_SERVERE_ERROR } = require('./Constans');

const handleErrors = (err, req, res, next) => {
  console.log(err);
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(INTERNAL_SERVERE_ERROR).send({ message: 'На сервере произошла ошибка' });
  }
  next();
};

module.exports = handleErrors;
