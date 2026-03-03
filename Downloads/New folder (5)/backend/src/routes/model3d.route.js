const express = require('express');
const router = express.Router();
const model3dController = require('../controllers/model3d.controller');
const { upload } = require('../utils/cloudinary');

router.get('/', model3dController.getModels);

router.post('/upload', upload.single('model'), model3dController.createModel);

router.delete('/:id', model3dController.deleteModel);

module.exports = router;
