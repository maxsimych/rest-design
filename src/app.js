const express = require('express');
const logger = require('./lib/utils/logger');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json());
app.use('/', userRoutes);
app.use((error, req, res, next) => {
  logger.error(error);
  res.status(500).json({message: error.message});
});

module.exports = app;