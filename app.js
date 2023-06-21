const express = require('express');
const app = express();

const users = require('./routers/users');
require('dotenv').config();

app.use('/users',users);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke 💩');
});

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Server is running on port ${process.env.EXPRESS_PORT}`);
});