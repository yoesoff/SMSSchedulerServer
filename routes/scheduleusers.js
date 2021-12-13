const express = require('express');
const router = express.Router();
const scheduleuserController = require('../controllers').scheduleuser;

/* ScheduleUser Router */
router.get('/', scheduleuserController.list);
router.get('/:id', scheduleuserController.getById);
router.post('/user', scheduleuserController.add);
router.put('/user/:id', scheduleuserController.update);
router.delete('/user/:id', scheduleuserController.delete);

module.exports = router;
