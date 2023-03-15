const User = require('../models/user');
const UserNotFound = require('../errors/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((users) => res.status(200).send({ data: users }))
    .catch((error) => {
      if (error.name === 'UserNotFound') {
        res.status(error.status).send(error);
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы неккоректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((users) => res.status(200).send({ data: users }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send(error);
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((users) => res.status(200).send({ data: users }))
    .catch((error) => {
      if (error.name === 'UserNotFound') {
        res.status(error.status).send(error);
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};
