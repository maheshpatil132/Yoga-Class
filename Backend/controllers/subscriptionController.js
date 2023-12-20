const subscriptionModel = require('../models/subscriptionModel');

const createSubscription = async (req, res) => {
  try {
    const { user_id, batch_id, startdate, enddate , payment_id } = req.body;

    // Check if required parameters are present
    if (!user_id || !batch_id || !startdate || !payment_id) {
      return res.status(400).json({ error: 'user_id, batch_id, payment_id and startdate are required' });
    }

    // Create a subscription for the user
    await subscriptionModel.createSubscription({ user_id, batch_id, startdate, enddate , payment_id });

    res.json({ success: true, message: 'Subscription created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getUserSubscriptions = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch user subscriptions from the database
    const subscriptions = await subscriptionModel.getUserSubscriptions(userId);
    if (!subscriptions || subscriptions.length === 0) {
      return res.status(404).json({ error: 'User has no subscriptions' });
    }

    

    res.json({ ...subscriptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSubscriptionDetails = async (req, res) => {
  try {
    const subscriptionId = req.params.subscriptionId;

    // Fetch subscription details from the database
    const subscription = await subscriptionModel.getSubscriptionDetails(subscriptionId);

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    res.json({ subscription });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const cancelSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.subscriptionId;

    // Fetch subscription details from the database
    const subscription = await subscriptionModel.getSubscriptionDetails(subscriptionId);

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    // Perform any cancellation logic (e.g., updating enddate)
    await subscriptionModel.cancelSubscription(subscriptionId);

    res.json({ success: true, message: 'Subscription canceled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createSubscription, getUserSubscriptions, getSubscriptionDetails, cancelSubscription };
