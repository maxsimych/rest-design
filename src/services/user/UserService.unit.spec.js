const UserService = require('./UserService');


describe('this.UserModel', () => {
  it('should respond', () => {
    const UserModel = {};
    const userService = new UserService(UserModel);
    const result = userService.UserModel;
    expect(result).toEqual({});
  });
});
describe('createUser', () => {
  it('should respond', () => {
    const UserModel = class {
      save() {
        return {}
      }
    }
    const userService = new UserService(UserModel);
    const result = userService.createUser();
    expect(result).toEqual({});
  });
  it('should pass firstName and lastName to UserModel class', () => {
    const UserModel = class {
      constructor(firstAndLastName) {
        this.firstAndLastName = firstAndLastName
      }
      save() {
        return this.firstAndLastName
      }
    };
    const firstName = 'foo';
    const lastName = 'bar';
    const userService = new UserService(UserModel);
    const result = userService.createUser(firstName, lastName);
    expect(result).toEqual({firstName, lastName});
  })
})
describe('listUsers', () => {
  it('should respond', async () => {
    const UserModel = {
      find() {
        return Promise.resolve({});
      }
    }
    const userService = new UserService(UserModel);
    const result = await userService.listUsers();
    expect(result).toEqual({});
  });
  it('should pass offset, limit, null correctly', async () => {
    const offset = 10;
    const limit = 5;
    const UserModel = {
      find(shouldDelFalseObj, shouldNull, shouldOffsetLimitObj) {
        return Promise.resolve({ shouldDelFalseObj, shouldNull, shouldOffsetLimitObj });
      }
    }
    const userService = new UserService(UserModel);
    const result = await userService.listUsers(offset, limit);
    const expected = {
      shouldDelFalseObj: { deleted: false },
      shouldNull: null,
      shouldOffsetLimitObj: {
        skip: offset,
        limit: limit
      }
    }
    expect(result).toEqual(expected);
  });
  it('should map fields correctly', async () => {
    const fields = ['foo'];
    const UserModel = {
      find() {
        return Promise.resolve([
          {
            foo: '',
            bar: ''
          },
          {
            foo: '',
            bar: ''
          }
        ]);
      }
    }
    const userService = new UserService(UserModel);
    const result = await userService.listUsers(0,0,fields);
    expect(result).toEqual([{"foo": ""}, {"foo": ""}]);
  });
});
describe('getUser', () => {
  it('should respond', () => {
    const UserModel = {
      findById() {
        return {};
      }
    }
    const userService = new UserService(UserModel);
    const result = userService.getUser();
    expect(result).toEqual({});
  })
});
describe('updateUser', () => {
  it('should respond', async () => {
    const UserModel = {
      findById() {
        return Promise.resolve({
          save() {
            return {}
          }
        });
      }
    }
    const userService = new UserService(UserModel);
    const result = await userService.updateUser();
    expect(result).toEqual({});
  });
  it('should pass userId and called once', async () => {
    const mockFn = jest.fn(() => {
      return Promise.resolve({
        save() {
          return;
        }
      });
    });
    const UserModel = {
      findById(userId) {
        return mockFn(userId);
      } 
    }
    const userService = new UserService(UserModel);
    const userId = 'id';
    await userService.updateUser(userId);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toBeCalledWith(userId);
  });
  it('should pass firstName and lastName', async () => {
    const UserModel = {
      findById() {
        return Promise.resolve({
          save() {
            return [
              this.firstName,
              this.lastName
            ];
          }
        });
      }
    }
    const userService = new UserService(UserModel);
    const result = await userService.updateUser('', 'first', 'last');
    expect(result).toEqual(['first', 'last']);
  })
});
describe('deleteUser', () => {
  it('should respond', async () => {
    const UserModel = {
      findById() {
        return Promise.resolve({
          save() {
            return {}
          }
        });
      }
    }
    const userService = new UserService(UserModel);
    const result = await userService.deleteUser();
    expect(result).toEqual({});
  })
});
describe('_extractFields', () => {
  it('should extract fields from proporties', () => {
    const arr = ['foo', 'bar'];
    const obj = {
      foo: '',
      bar: '',
      baz: ''
    };
    const userService = new UserService();
    const result = userService._extractFields(obj,arr);
    expect(result).toEqual({foo:'', bar:''});
  })
});