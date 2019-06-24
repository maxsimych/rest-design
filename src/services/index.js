const UserService = require('./user/UserService');
const UserModel = require('./user/UserModel');

module.exports = {
  userService: new UserService(UserModel)
};