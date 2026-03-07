const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const { upload } = require('../utils/cloudinary');

// /api/upload
router.post('/', upload.single('files[0]'), uploadController.uploadMedia);

module.exports = router;
