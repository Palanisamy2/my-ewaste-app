const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();
// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);

module.exports = router;