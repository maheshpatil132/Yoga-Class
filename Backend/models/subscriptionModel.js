const { db } = require('../db');

const createSubscription = (subscriptionData) => {
  const { user_id, batch_id, startdate, enddate , payment_id } = subscriptionData;
  const stmt = db.prepare('INSERT INTO subscriptions (user_id, batch_id, startdate, enddate ,payment_id) VALUES (?, ?, ?, ? , ?)');
  stmt.run(user_id, batch_id, startdate, enddate , payment_id);
  stmt.finalize();
};

const getUserSubscriptions = (userId) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT subscriptions.startdate , subscriptions.enddate , batches.time_duration, users.name, users.email
    FROM subscriptions
    JOIN batches ON subscriptions.batch_id = batches.batch_id
    JOIN users ON subscriptions.user_id = users.user_id
    WHERE subscriptions.user_id = ?`, [userId], (error, subscriptions) => {
      if (error) {
        reject(error);
      } else {
        resolve(subscriptions);
      }
    });
  });
};

const getSubscriptionDetails = (subscriptionId) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM subscriptions WHERE subscription_id = ?', [subscriptionId], (error, subscription) => {
      if (error) {
        reject(error);
      } else {
        resolve(subscription);
      }
    });
  });
};

const cancelSubscription = (subscriptionId) => {
  const stmt = db.prepare('UPDATE subscriptions SET enddate = CURRENT_DATE WHERE subscription_id = ?');
  stmt.run(subscriptionId);
  stmt.finalize();
};

module.exports = { createSubscription, getUserSubscriptions, getSubscriptionDetails, cancelSubscription };
