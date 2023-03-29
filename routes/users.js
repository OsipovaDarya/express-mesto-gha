const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();
const {
  getUser, getUsers, updateUser, updateUserAvatar, getInformUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getInformUser);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), getUser);
// router.post('/users', createUser); // cоздает

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);// обновляет профиль

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), updateUserAvatar); // обновляет аватар

module.exports = router;
