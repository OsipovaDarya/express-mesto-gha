const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const NotFound = require('../errors/NotFound');
const { URL } = require('../utils/url');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(URL),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);

router.use(auth);

router.use('/users', usersRoutes);
router.use('/', cardsRoutes);

router.use('*', (req, res, next) => next(new NotFound('Неправильный путь')));

module.exports = router;
