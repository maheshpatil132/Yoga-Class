const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const path = require('path');
const app = express();
const db = new sqlite3.Database(path.resolve(__dirname, 'yoga_classes.db'));

const connect = (callback) => {
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY, name TEXT, email TEXT, age INTEGER, password TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS subscriptions (subscription_id INTEGER PRIMARY KEY, user_id INTEGER, batch_id INTEGER, startdate TEXT, enddate TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS batches (batch_id INTEGER PRIMARY KEY, time_duration TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS payments (payment_id INTEGER PRIMARY KEY, amount INTEGER, user_id INTEGER, batch_id INTEGER, paid_at TEXT)');
  });

  callback();
};

module.exports = { db, connect, app };
