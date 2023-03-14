const user = require('../models/user');

// module.exports.getUser = (req, res) => { };

// module.exports.getUsers = (req, res) => { };

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return user.create(name, about, avatar)
    .then(() => res.status(201).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'ошибка при создании пользователя' }));
};
