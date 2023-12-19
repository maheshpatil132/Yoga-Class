const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const batchRoutes = require('./routes/batchRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const cors = require('cors')
const db = require('./db');

const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:3000', // Update with the actual origin of your client
  credentials: true
}));

app.use(bodyParser.json());
// Routes
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/payments', paymentRoutes);

// Database connection
db.connect(() => {
  console.log('DB is connected');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
