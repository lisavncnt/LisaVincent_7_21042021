const express = require('express');
const router = express.Router();
const ctrl_cmnt = require('../controllers/comment');
const auth = require('../middleware/auth');


router.post('/add', ctrl_cmnt.createComment);

router.get('/', ctrl_cmnt.getAllComments);
router.get('/:id', ctrl_cmnt.getOneComment);

router.put('/:id', ctrl_cmnt.modifyComment);

router.delete('/:id', ctrl_cmnt.deleteComment);

module.exports = router;