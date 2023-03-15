const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const usersRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64117cad65139c2ae0c2e769',
  };

  next();
});
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', usersRouter);
app.use('/', cardRouter);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
