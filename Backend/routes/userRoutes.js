const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.login);
router.get('/profile/:userId', userController.getUserProfile);
router.post('/subscribe/:userId', userController.subscribeToBatch);

module.exports = router;
