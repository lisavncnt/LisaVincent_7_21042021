const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer_config');

const ctrl_user = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', multer, ctrl_user.signup);
router.post('/signin', ctrl_user.signin);

router.get('/all_users', multer, ctrl_user.getAllUsers);

router.get('/user/:id', multer, ctrl_user.getOneUser);
router.put('/user/:id', multer, ctrl_user.modifyUser);
router.delete('/user/:id', ctrl_user.deleteUser);

module.exports = router;