const userControllers = require('./userControllers');

jest.mock('../services');
jest.mock('../lib/utils/logger');
jest.mock('../lib/utils/catchException');
describe('getAll', () => {
  it('should call res once with list arg', async () => {
    const { userService } = require('../services');
    userService.listUsers = () => {
      return Promise.resolve('foo');
    };
    const req = {};
    const res = {};
    res.json = jest.fn();
    req.query = {};
    await userControllers.getAll(req, res);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith('foo');
  });
  it('should pass to service listUsers numbers for offset and limit and undefined for empty fields', async () => {
    const { userService } = require('../services');
    userService.listUsers = jest.fn(() => {
      Promise.resolve()
    })
    const req = {};
    const res = {};
    res.json = () => {};
    req.query = {
      offset: '1',
      limit: '1',
      fields: ''
    };
    await userControllers.getAll(req, res);
    expect(userService.listUsers).toBeCalledWith(1,1,undefined);
  });
  it('should pass to service listUsers max limit 50', async () => {
    const { userService } = require('../services');
    userService.listUsers = jest.fn(() => {
      Promise.resolve()
    })
    const req = {};
    const res = {};
    res.json = () => {};
    req.query = {
      offset: '0',
      limit: '60',
      fields: ''
    };
    await userControllers.getAll(req, res);
    expect(userService.listUsers).toBeCalledWith(0,50,undefined);
  });
  it('should pass to service listUsers fields array', async () => {
    const { userService } = require('../services');
    userService.listUsers = jest.fn(() => {
      Promise.resolve()
    });
    const req = {};
    const res = {};
    res.json = () => {};
    req.query = {
      offset: '0',
      limit: '0',
      fields: 'foo,bar'
    };
    await userControllers.getAll(req, res);
    expect(userService.listUsers).toBeCalledWith(0,0,['foo','bar']);
  });
  it('should pass to logger correct message', async () => {
    const logger = require('../lib/utils/logger');
    logger.info = jest.fn();
    const req = {};
    const res = {};
    res.json = () => {};
    req.query = {
      offset: '0',
      limit: '1',
      fields: 'foo,bar'
    };
    const expected = 'GET /api/v1/users offset=0 limit=1 fields=foo,bar';
    await userControllers.getAll(req, res);
    expect(logger.info).toBeCalledWith(expected);
  });
});

describe('post', () => {
  it('should call res once with list arg', async () => {
    const { userService } = require('../services');
    userService.createUser = () => {
      return Promise.resolve('foo');
    };
    const req = {};
    const res = {};
    req.body = {
      firstName: '',
      lastName: ''
    };
    res.json = jest.fn();
    await userControllers.post(req, res);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith('foo');
  });
  it('should extract firstName and lastName and pass it to service createUser', async () => {
    const { userService } = require('../services');
    userService.createUser = jest.fn(() => {
      Promise.resolve()
    })
    const req = {};
    const res = {};
    req.body = {
      firstName: 'foo',
      lastName: 'bar'
    };
    res.json = () => {};
    await userControllers.post(req, res);
    expect(userService.createUser).toBeCalledWith('foo', 'bar');
  });
  it('should pass to logger correct message', async () => {
    const logger = require('../lib/utils/logger');
    logger.info = jest.fn();
    const req = {};
    const res = {};
    req.body = {
      firstName: 'foo',
      lastName: 'bar'
    }
    res.json = () => {};
    const expected = 'POST /api/v1/users firstName=foo lastName=bar';
    await userControllers.post(req, res);
    expect(logger.info).toBeCalledWith(expected);
  });
});
describe('getOne', () => {
  it('should call res once with user arg', async () => {
    const { userService } = require('../services');
    userService.getUser = () => {
      return Promise.resolve('foo');
    };
    const req = {
      params: {
        id: ''
      }
    };
    const res = {};
    res.json = jest.fn();
    await userControllers.getOne(req, res);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith('foo');
  });
  it('should extract userId and pass it to service getUser', async () => {
    const { userService } = require('../services');
    userService.getUser = jest.fn(() => {
      Promise.resolve()
    })
    const req = {
      params: {
        id: 'foo'
      }
    };
    const res = {};
    res.json = () => {};
    await userControllers.getOne(req, res);
    expect(userService.getUser).toBeCalledWith('foo');
  });
  it('should pass to logger correct message', async () => {
    const logger = require('../lib/utils/logger');
    logger.info = jest.fn();
    const req = {
      params: {
        id: 'foo'
      }
    };
    const res = {};
    res.json = () => {};
    const expected = 'GET /api/v1/users/:id id=foo';
    await userControllers.getOne(req, res);
    expect(logger.info).toBeCalledWith(expected);
  });
});
describe('put', () => {
  it('should call res once with user arg', async () => {
    const { userService } = require('../services');
    userService.updateUser = () => {
      return Promise.resolve('foo');
    };
    const req = {
      params: {
        id: ''
      },
      body: {
        firstName: '',
        lastName: ''
      }
    };
    const res = {};
    res.json = jest.fn();
    await userControllers.put(req, res);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith('foo');
  });
  it('should extract userId, firstName and last name and pass it to service updateUser', async () => {
    const { userService } = require('../services');
    userService.updateUser = jest.fn(() => {
      Promise.resolve()
    })
    const req = {
      params: {
        id: 'id'
      },
      body: {
        firstName: 'foo',
        lastName: 'bar'
      }
    };
    const res = {};
    res.json = () => {};
    await userControllers.put(req, res);
    expect(userService.updateUser).toBeCalledWith('id', 'foo', 'bar');
  });
  it('should pass to logger correct message', async () => {
    const logger = require('../lib/utils/logger');
    logger.info = jest.fn();
    const req = {
      params: {
        id: 'id'
      },
      body: {
        firstName: 'foo',
        lastName: 'bar'
      }
    };
    const res = {};
    res.json = () => {};
    const expected = 'PUT /api/v1/users/:id id=id  firstName=foo lastName=bar';
    await userControllers.put(req, res);
    expect(logger.info).toBeCalledWith(expected);
  });
});
describe('put', () => {
  it('should call res once with user arg', async () => {
    const { userService } = require('../services');
    userService.deleteUser = () => {
      return Promise.resolve('foo');
    };
    const req = {
      params: {
        id: ''
      }
    };
    const res = {};
    res.json = jest.fn();
    await userControllers.delete(req, res);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith('foo');
  });
  it('should extract userId and pass it to service deleteUser', async () => {
    const { userService } = require('../services');
    userService.deleteUser = jest.fn(() => {
      Promise.resolve()
    })
    const req = {
      params: {
        id: 'id'
      }
    };
    const res = {};
    res.json = () => {};
    await userControllers.delete(req, res);
    expect(userService.deleteUser).toBeCalledWith('id');
  });
  it('should pass to logger correct message', async () => {
    const logger = require('../lib/utils/logger');
    logger.info = jest.fn();
    const req = {
      params: {
        id: 'id'
      }
    };
    const res = {};
    res.json = () => {};
    const expected = 'DELETE /api/v1/users/:id id=id';
    await userControllers.delete(req, res);
    expect(logger.info).toBeCalledWith(expected);
  });
});