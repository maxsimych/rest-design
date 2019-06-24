const UserModel = require('./UserModel');
describe('User mongoose Model', () => {
  it('should fail without firstName', () => {
    const user = new UserModel({lastName: 'bar'});
    user.validate(error => {
      expect(error.name).toBeDefined();
    })
  });
  it('should fail without lastName', () => {
    const user = new UserModel({firstName: 'foo'});
    user.validate(error => {
      expect(error.name).toBeDefined();
    })
  });
  it('should pass with strings and deleted to be false', () => {
    const user = new UserModel({firstName: 'foo', lastName: 'foo'});
    user.validate(error => {
      expect(error).toBe(null);
    });
    expect(user.deleted).toBe(false);
  });
});