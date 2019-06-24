const logger = require('bunyan-mongodb-logger');

module.exports = logger({
  name: 'restApiDesign',
  streams: ['mongodb', 'stdout'],
  url: 'mongodb://db:27017/restDesign',
  level: 'info'
});