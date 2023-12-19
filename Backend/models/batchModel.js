const { db } = require('../db');

const createBatch = (batchData) => {
  const { time_duration } = batchData;
  const stmt = db.prepare('INSERT INTO batches (time_duration) VALUES (?)');
  stmt.run(time_duration);
  stmt.finalize();
};

const getAllBatches = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM batches', (error, batches) => {
      if (error) {
        reject(error);
      } else {
        resolve(batches);
      }
    });
  });
};


const deleteAllBatches = () => {
  return new Promise((resolve, reject) => {
    db.all('DELETE FROM batches', (error, batches) => {
      if (error) {
        reject(error);
      } else {
        resolve(batches);
      }
    });
  });
};

module.exports = { createBatch, getAllBatches , deleteAllBatches };
