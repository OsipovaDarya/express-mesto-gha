const router = require('express').Router();
const {
  createUser, getUser, getUsers, updateUser, updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);

router.patch('/users/me', updateUser); // обновляет профиль
router.patch('/users/me/avatar', updateUserAvatar); // обновляет аватар

module.exports = router;
