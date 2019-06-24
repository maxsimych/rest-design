const catchException = require('./catchException');

describe('catchException', () => {
  it('should execute inner func once', async () => {
    const req = {};
    const res = jest.fn();
    (catchException((req,res) => {res()}))(req,res);
    expect(res).toHaveBeenCalledTimes(1);
  });
  it('should execute next once if error', async () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    await (catchException(async (req,res) => {throw 'err'}))(req,res,next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});