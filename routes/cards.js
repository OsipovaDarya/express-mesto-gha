const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCards,
  putLikes,
  deleteLikes,
} = require('../controllers/cards');
const { URL } = require('../utils/url');

router.get('/cards', getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(URL),
  }),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCards); // удалить карточку

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), putLikes); // поставить лайк

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteLikes); // убрать лайк

module.exports = router;
