const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const {
  getUser, getUsers, updateUser, updateUserAvatar, getUserMe,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', (req, res) => {
  res.send('хуйня');
});

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
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
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
  }),
}), updateUserAvatar); // обновляет аватар

module.exports = router;
