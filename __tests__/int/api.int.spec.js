const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../../src/app');
jest.mock('../../src/lib/utils/logger');
const testArr = [
  {firstName: '1foo',
  lastName: '1bar',
  deleted: false},
  {firstName: '2foo',
  lastName: '2bar',
  deleted: false},
  {firstName: '3foo',
  lastName: '3bar',
  deleted: false}
];
let arrIds;

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, (err) => {
    if (err) console.error(err);
  });
});

afterAll(async () => {
  mongoose.disconnect();
  await mongoServer.stop();
});
beforeEach(async () => {
  const { insertedIds } = await mongoose.connection.db.collection('users').insertMany(testArr);
  arrIds = insertedIds;
});
afterEach(async () => {
  await mongoose.connection.db.dropCollection('users');
})


describe('GET /api/v1/users', () => {
  it('should answer with status 200, body with array of three objs', async () => {
    const response = await request(app).get('/api/v1/users')
      .expect(200)
      .expect('Content-Type', /json/);
    expect(response.body.length).toBe(3);
  });
  it('should correctly answer with offsets,limits, and fields used', async () => {
    const response = await request(app).get('/api/v1/users')
      .query({offset: 1, limit: 1, fields: 'firstName,lastName'})
      .expect(200)
      .expect('Content-Type', /json/);
      expect(response.body).toEqual([{firstName: '2foo', lastName: '2bar'}]);
  })
});
describe('POST /api/v1/users', () => {
  describe('Successful', () => {
    it('should correctly answer with user obj if successful ', async () => {
      const response = await request(app).post('/api/v1/users')
        .send({firstName: 'foo',lastName: 'bar'})
        .expect(200)
        .expect('Content-Type', /json/);
      expect(response.body.firstName).toBe('foo');
    })
  });
  describe('Unsuccsessful', () => {
    it('should correctly answer with status 500 and body with message', async () => {
      const response = await request(app).post('/api/v1/users')
        .send({firstName: 'foo'})
        .expect(500)
        .expect('Content-Type', /json/);
      expect(response.body.message).toMatch(/failed/);
    })
  });
});
describe('GET /api/v1/users/:id', () => {
  it('should answer correctly with an user object with given ID', async () => {
    const userId = arrIds['0'];
    const response = await request(app).get(`/api/v1/users/${userId}`)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(response.body.firstName).toBe('1foo');
  });
});
describe('PUT /api/v1/users/:id', () => {
  it('should answer correctly with an user object with edited fields', async () => {
    const userId = arrIds['0'];
    const response = await request(app).put(`/api/v1/users/${userId}`)
      .send({firstName: '1edited'})
      .expect(200)
      .expect('Content-Type', /json/);
    expect(response.body.firstName).toBe('1edited');
  });
});
describe('DELETE /api/v1/users/:id', () => {
  it('should answer correctly with an user object with deleted: true', async () => {
    const userId = arrIds['0'];
    const response = await request(app).delete(`/api/v1/users/${userId}`)
      .expect(200)
      .expect('Content-Type', /json/);
    expect(response.body.deleted).toBeTruthy();
  });
});
