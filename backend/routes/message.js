const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const ctrl_msg = require('../controllers/message');

router.post('/add', ctrl_msg.createMessage);

router.get('/', ctrl_msg.getAllMessages);
router.get('/:id', ctrl_msg.getOneMessage);

router.put('/', ctrl_msg.modifyMessage);

router.delete('/', ctrl_msg.deleteMessage);

module.exports = router;