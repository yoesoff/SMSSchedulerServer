var express = require('express');
const {user: userController} = require("../controllers");
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* User Router */
router.get('/', userController.list);
router.get('/:id', userController.getById);
router.post('/user', userController.add);
router.put('/user/:id', userController.update);
router.delete('/user/:id', userController.delete);

module.exports = router;
