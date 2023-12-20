const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Record a payment
router.post('/record', paymentController.recordPayment );
router.get('/history/:userId', paymentController.getUserPaymentHistory);

module.exports = router;
