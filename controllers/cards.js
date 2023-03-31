const Card = require('../models/card');
const UserNotFound = require('../errors/UserNotFound');
const { BAD_REQUEST, NOT_FOUND } = require('../errors/Constans');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        next(error);
      }
    });
};

module.exports.deleteCards = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Ошибка проверки данных' });
      }
      if (error.name === 'UserNotFound') {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        next(error);
      }
    });
};

module.exports.putLikes = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((users) => res.send({ data: users }))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Ошибка проверки данных' });
      }
      if (error.name === 'UserNotFound') {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        next(error);
      }
    });
};

module.exports.deleteLikes = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((users) => res.send({ data: users }))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Ошибка проверки данных' });
      }
      if (error.name === 'UserNotFound') {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        next(error);
      }
    });
};
