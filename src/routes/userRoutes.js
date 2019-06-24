const userControllers = require('../controllers/userControllers');
const { Router } = require('express');
const router = new Router;


router.get(
  '/api/v1/users',
  userControllers.getAll
);
router.post(
  '/api/v1/users',
  userControllers.post
);
router.get(
  '/api/v1/users/:id',
  userControllers.getOne
);
router.put(
  '/api/v1/users/:id',
  userControllers.put
);
router.delete(
  '/api/v1/users/:id',
  userControllers.delete
);

module.exports = router;