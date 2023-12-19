const { db } = require('../db');

const registerUser = (userData) => {
  const { name, email, age, password } = userData;
  const stmt = db.prepare('INSERT INTO users (name, email, age, password) VALUES (?, ?, ?, ?)');
  stmt.run(name, email, age, password);
  stmt.finalize();
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE user_id = ?', [userId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

module.exports = { registerUser, getUserByEmail, getUserById };
