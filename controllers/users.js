const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const UserNotFound = require('../errors/UserNotFound');
const ConflictingRequest = require('../errors/ConflictingRequest');
const CastError = require('../errors/CastError');
const AuthorizedError = require('../errors/AuthorizedError');

const {
  BAD_REQUEST, INTERNAL_SERVERE_ERROR, NOT_FOUND,
} = require('../errors/Constans');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      if (!user) {
        throw new AuthorizedError('Нужно пройти авторизацию');
      }
      return res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  console.log('fsdf', userId);
  User.findById(userId)
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((users) => res.send(users))
    .catch((error) => {
      console.log(error);
      if (error.name === 'CastError') {
        next(new BAD_REQUEST('Ошибка проверки данных'));
      }
      if (error.name === 'UserNotFound') {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        next(error);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
      email: user.email,
    }))
    .catch((error) => {
      if (error.code === 11000) {
        next(new ConflictingRequest('Такой пользователь уже существует'));
        return;
      }
      if (error.name === 'ValidationError') {
        next(new CastError('Ошибка проверки данных'));
      } else {
        next(error);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};

// user/me
module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((users) => res.send({ data: users }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new CastError('Пользователь не найден'));
      } else {
        next(error);
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
      if (error.name === 'UserNotFound') {
        res.status(NOT_FOUND).send({ message: 'Ошибка проверки данных' });
      } else {
        res.status(INTERNAL_SERVERE_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};
