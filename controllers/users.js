const User = require('../models/user');
const UserNotFound = require('../errors/AplicationError');
const { BAD_REQUEST, INTERNAL_SERVERE_ERROR } = require('../errors/Constans');

module.exports.getUsers = (req, res) => {
  console.log(INTERNAL_SERVERE_ERROR);
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SERVERE_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res.status(INTERNAL_SERVERE_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SERVERE_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((users) => res.send({ data: users }))
    .catch((error) => {
      if (error.name === 'UserNotFound') {
        res.status(BAD_REQUEST).send({ message: 'Ошибка проверки данных' });
      } else {
        res.status(INTERNAL_SERVERE_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((users) => res.send({ data: users }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Ошибка проверки данных' });
      } else {
        res.status(INTERNAL_SERVERE_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};
