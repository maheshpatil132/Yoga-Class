const batchModel = require('../models/batchModel');

const getAllBatches = async (req, res) => {
  try {
    // Fetch all available batches from the database
    const batches = await batchModel.getAllBatches();

    if (!batches || batches.length === 0) {
      return res.status(404).json({ error: 'No batches available' });
    }

    res.json({ batches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createBatch = async (req, res) => {
  try { 
    const { time_duration } = req.body;

    // Basic validation
    if (!time_duration) {
      return res.status(400).json({ error: 'Time duration is required' });
    }

    // Create a new batch
    const batchId = await batchModel.createBatch({ time_duration });

    res.json({ success: true, message: 'Batch created successfully', batchId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteAllBatches = async (req, res) => {
  try {
    // Fetch all available batches from the database
    const batches = await batchModel.deleteAllBatches();

   
    res.json({ message : "All batches are deleted" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllBatches, createBatch , deleteAllBatches };
