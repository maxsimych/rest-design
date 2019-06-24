const app = require('./src/app');
const mongoose = require('mongoose');
const logger = require('./src/lib/utils/logger');

(async () => {
  await mongoose.connect('mongodb://localhost:27017/restDesign', { useNewUrlParser: true });
  console.log('Connected to mongoDB');
  await app.listen(3000);
  console.log('listening port 3000');
})();


process.on('unhandledRejection', error => {
  logger.error(error);
  process.exit(1);
});


