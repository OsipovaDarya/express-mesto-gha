const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const { createUser, login } = require('../controllers/users');
// const { auth } = require('../middlewares/auth');

router.post('/signup', createUser);

router.post('/signin', login);
module.exports = router;
