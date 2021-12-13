const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers').schedule;

/* Schedule Router */
router.get('/', scheduleController.list);
router.get('/:id', scheduleController.getById);
router.post('/user', scheduleController.add);
router.put('/user/:id', scheduleController.update);
router.delete('/user/:id', scheduleController.delete);

module.exports = router;
