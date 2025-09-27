require('dotenv').config();
const express = require('express');
const cors = require('cors')
const rateLimit= require('express-rate-limit');
const connectDB = require('./config/db')
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/productRoutes');
const orderRoutes= require('./routes/orderRoutes')

const app = express();

// Middleware
app.use(express.json());

//cors
app.use(cors());

//Limiter setup for rate limiting
const limiter = rateLimit({
    windows: 5 * 60 * 1000,
    max: 80,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'many requests from IP, try again after 5 minutes'

});
app.use(limiter);

// Connection to DB
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});