jest.mock('./user/UserService');
jest.mock('./user/UserModel');
const index = require('./index');
it('should be object that contain userService object', () => {
  expect(typeof index.userService).toBe('object');
});
it('should pass UserModel to UserService', () => {
  expect(index.userService.UserModel).toBe('foo');
});