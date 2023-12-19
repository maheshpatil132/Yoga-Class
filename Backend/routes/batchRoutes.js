const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');


// Get all available batches
router.get('/all', batchController.getAllBatches);

// Create a new batch
router.post('/create', batchController.createBatch);


router.delete('/delete/all', batchController.deleteAllBatches);

module.exports = router;
