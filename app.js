const express = require('express');
const app = express();
const notes = require('./routers/notes')
require('dotenv').config();

app.use('/notes',notes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke 💩');
});

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`Server is running on port ${process.env.EXPRESS_PORT}`);
});