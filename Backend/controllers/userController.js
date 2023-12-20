const userModel = require('../models/userModel');
const subscriptionController = require('./subscriptionController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { name, email, age, password } = req.body;

    if (!name || !email || !age || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = { name, email, age, password: hashedPassword };
    const userId = await userModel.registerUser(user);
    
    // Do not automatically create subscription here
    user.user_id = userId
    

    res.json({ success: true, message: 'Registration successful', user});
  } catch (error) {
 
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ user_id: user.user_id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ token, user_id: user.user_id , user });


  } catch (error) {

    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const subscribeToBatch = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { batch_id } = req.body;

    if (![1, 2, 3].includes(batch_id)) {
      return res.status(400).json({ error: 'Invalid batch ID' });
    }

    subscriptionController.createSubscription({ user_id: userId, batch_id, startdate: new Date().toISOString(), enddate: null });

    res.json({ success: true, message: 'Subscription successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { registerUser, login, getUserProfile, subscribeToBatch };
