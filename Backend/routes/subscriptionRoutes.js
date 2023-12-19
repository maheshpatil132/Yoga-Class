const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.post('/create', subscriptionController.createSubscription);
router.get('/user/:userId', subscriptionController.getUserSubscriptions);
router.get('/:subscriptionId', subscriptionController.getSubscriptionDetails);
router.post('/cancel/:subscriptionId', subscriptionController.cancelSubscription);

module.exports = router;
