const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product.route');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Error handling
app.use(errorMiddleware);

module.exports = app;
