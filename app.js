require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const handleErrors = require('./errors/handleErrors');

const router = require('./routes/index');

const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   req.user = {
//     _id: '64252a6a03df7010aeb7de4d',
//   };

//   next();
// });

app.use(router);
// app.use((req, res) => {
//   res.status(404).send({ message: 'Несуществующая страница' });
// });

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
