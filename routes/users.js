const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();
const { URL } = require('../utils/url');

const {
  getUser, getUsers, updateUser, updateUserAvatar, getUserMe,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUserMe);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);
// router.post('/users', createUser); // cоздает

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);// обновляет профиль

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(URL),
  }),
}), updateUserAvatar); // обновляет аватар

module.exports = router;
