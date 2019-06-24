const logger = require('../lib/utils/logger');
const catchException = require('../lib/utils/catchException');
const { userService } = require('../services');
const user = {};

user.getAll = catchException(async (req, res) => {
  let { offset, limit, fields } = req.query;
  offset = parseInt(offset);
  limit = parseInt(limit);
  limit = Math.min(limit, 50);
  fields = fields ? fields.split(',') : undefined;
  const list = await userService.listUsers(offset, limit, fields);
  logger.info(
    `GET /api/v1/users offset=${offset} limit=${limit} fields=${fields}`
  );
  res.json(list);
});

user.post = catchException(async (req,res) => {
  const { firstName, lastName } = req.body;
  const user = await userService.createUser(firstName, lastName);
  logger.info(
    `POST /api/v1/users firstName=${firstName} lastName=${lastName}`
  );
  res.json(user);
});
user.getOne = catchException(async (req, res) => {
  const userId = req.params.id;
  const user = await userService.getUser(userId);
  logger.info(
    `GET /api/v1/users/:id id=${userId}`
  );
  res.json(user);
});
user.put = catchException(async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName } = req.body;
  const user = await userService.updateUser(userId, firstName, lastName);
  logger.info(
    `PUT /api/v1/users/:id id=${userId}  firstName=${firstName} lastName=${lastName}`
  );
  res.json(user);
});
user.delete = catchException(async (req, res) => {
  const userId = req.params.id;
  const user = await userService.deleteUser(userId);
  logger.info(
    `DELETE /api/v1/users/:id id=${userId}`
  );
  res.json(user);
});

module.exports = user;