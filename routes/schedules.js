const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers').schedule;

/* Schedule Router */
router.get('/', scheduleController.list);
router.get('/:id', scheduleController.getById);
router.post('/', scheduleController.add);
router.put('/:id', scheduleController.update);
router.delete('/:id', scheduleController.delete);

module.exports = router;
