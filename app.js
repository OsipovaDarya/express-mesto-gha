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

app.use(router);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

router.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
