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
  origin: ['http://localhost:3000' , 'https://yoga-class-frontend-drab.vercel.app'], // Update with the actual origin of your client
  credentials: true
}));

app.use(bodyParser.json());
// Routes
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/payments', paymentRoutes);


app.use('/', (req, res, next)=>{
  res.status(200).json({
    message : "Server is runing..."
  })
})

// Database connection
db.connect(() => {
  console.log('DB is connected');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
