const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const { upload } = require('../utils/cloudinary');

// Public routes
router.get('/', blogController.getBlogs);
router.get('/:slug', blogController.getBlog);

// Admin routes (should be protected in production)
router.post('/', upload.single('image'), blogController.createBlog);
router.put('/:id', upload.single('image'), blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;

module.exports = router;
