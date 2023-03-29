const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const usersRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const indexRouter = require('./routes/index');

const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64117cad65139c2ae0c2e769',
  };

  next();
});

app.use('/', usersRouter);
app.use('/', cardRouter);
app.use('/', indexRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Несуществующая страница' });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(errors());

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
