const paymentModel = require('../models/paymentModel');

const recordPayment = async (req, res) => {
  try {
    const { amount, user_id, batch_id } = req.body;

    // Basic validation
    if (!amount || !user_id || !batch_id) {
      return res.status(400).json({ error: 'Amount, user_id, and batch_id are required' });
    }

    // Record the payment
    const paymentId = await paymentModel.recordPayment({ amount, user_id, batch_id, paid_at: new Date().toISOString() });


    res.json({ success: true, message: 'Payment recorded successfully', paymentId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const getUserPaymentHistory = async (req, res) => {
  try {

    const userId = req.params.userId;


     const history = await paymentModel.getUserPaymentHistory(userId)

     if (!history || history.length === 0) {
      return res.status(404).json({ error: 'No history available' });
    }

    res.json({ history });

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





module.exports = { recordPayment , getUserPaymentHistory };
