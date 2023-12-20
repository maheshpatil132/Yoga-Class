const { db } = require('../db');

const recordPayment = (paymentData) => {
  return new Promise((resolve, reject) => {
    const { amount, user_id, batch_id, paid_at } = paymentData;
    const stmt = db.prepare('INSERT INTO payments (amount, user_id, batch_id, paid_at) VALUES (?, ?, ?, ?)');

    stmt.run(amount, user_id, batch_id, paid_at, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID); // Return the last inserted ID
      }

      stmt.finalize();
    });
  });
};



const getUserPaymentHistory = (user_id) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM payments WHERE user_id = ?', [user_id], (error, batches) => {
      if (error) {
        reject(error);
      } else {
        resolve(batches);
      }
    });
  });
}



module.exports = { recordPayment, getUserPaymentHistory };
