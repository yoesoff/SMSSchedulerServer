const express = require('express');
const router = express.Router();
const userController = require('../controllers').user;

/* User Router */
router.get('/', userController.list);
router.get('/:id', userController.getById);
router.post('/user', userController.add);
router.put('/user/:id', userController.update);
router.delete('/user/:id', userController.delete);

module.exports = router;
