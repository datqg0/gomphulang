const express = require('express');
const router = express.Router();
const model3dController = require('../controllers/model3d.controller');
const { upload } = require('../utils/cloudinary');

const uploadFields = upload.fields([
    { name: 'model', maxCount: 1 },
    { name: 'image', maxCount: 1 }
]);

router.get('/', model3dController.getModels);

router.post('/upload', uploadFields, model3dController.createModel);
router.put('/:id', uploadFields, model3dController.updateModel);
router.delete('/:id', model3dController.deleteModel);

module.exports = router;
