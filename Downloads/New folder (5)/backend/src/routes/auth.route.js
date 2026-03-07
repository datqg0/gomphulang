const express = require('express');
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/social-login', authController.socialLogin);
router.get('/users', authController.getUsers);
router.put('/me', protect, authController.updateProfile);
router.post('/setup-admin', authController.setupAdmin);

module.exports = router;