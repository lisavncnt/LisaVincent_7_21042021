const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');

const ctrl_img = require('../controllers/image');

router.post('/add', multer, ctrl_img.createImage);

router.get('/', ctrl_img.getAllImages);
router.get('/:id', ctrl_img.getOneImage);

router.put('/:id', multer, ctrl_img.modifyImage);

router.delete('/:id', ctrl_img.deleteImage);

module.exports = router;