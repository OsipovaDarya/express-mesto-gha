const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const usersRouter = require('./routes/users');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
