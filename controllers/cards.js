const Card = require('../models/card');
const UserNotFound = require('../errors/UserNotFound');
const { BAD_REQUEST, INTERNAL_SERVERE_ERROR, NOT_FOUND } = require('../errors/Constans');
// const CastError = require('../errors/CastError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => {
      res.status(INTERNAL_SERVERE_ERROR).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SERVERE_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.deleteCards = (req, res) => {
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
        res.status(INTERNAL_SERVERE_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.putLikes = (req, res) => {
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
        res.status(INTERNAL_SERVERE_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.deleteLikes = (req, res) => {
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
        res.status(INTERNAL_SERVERE_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};
