const express = require('express');
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/verify-otp', AuthController.verifyOTP);
router.post('/api-key', authMiddleware, AuthController.generateApiKey);
router.delete('/api-key', authMiddleware, AuthController.invalidateApiKey);

module.exports = router;