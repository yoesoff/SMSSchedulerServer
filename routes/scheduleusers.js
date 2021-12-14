const express = require('express');
const router = express.Router();
const scheduleuserController = require('../controllers').scheduleuser;

/* ScheduleUser Router */
router.get('/', scheduleuserController.list);
router.get('/:id', scheduleuserController.getById);
router.post('/', scheduleuserController.add);
router.put('/:id', scheduleuserController.update);
router.delete('/:id', scheduleuserController.delete);

module.exports = router;
