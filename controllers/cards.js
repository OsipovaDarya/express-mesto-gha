const Card = require('../models/card');
const UserNotFound = require('../errors/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidatorError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidatorError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.deleteCards = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new UserNotFound();
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((error) => {
      if (error.name === 'UserNotFound') {
        res.status(error.status).send(error);
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
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
    .then((users) => res.status(200).send({ data: users }))
    .catch((error) => {
      if (error.name === 'UserNotFound') {
        res.status(error.status).send(error);
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
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
    .then((users) => res.status(200).send({ data: users }))
    .catch((error) => {
      if (error.name === 'UserNotFound') {
        res.status(error.status).send(error);
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};
