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
  origin: ['http://localhost:3000' , 'https://yoga-class-frontend-drab.vercel.app'], 
  credentials: true
}));

app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/payments', paymentRoutes);


app.get('/' ,(req,res,next)=>{
  console.log("server in running");
  res.send("Hi, From bacakend")
})


app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Internal Server Error');
});



// Database connection
db.connect(() => {
  console.log('DB is connected');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
