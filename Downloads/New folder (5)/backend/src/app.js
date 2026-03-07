const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/product.route');
const categoryRoutes = require('./routes/category.route');
const authRoutes = require('./routes/auth.route');
const aiRoutes = require('./routes/ai.route');
const model3dRoutes = require('./routes/model3d.route');
const blogRoutes = require('./routes/blog.route');
const uploadRoutes = require('./routes/upload.route');
const orderRoutes = require('./routes/order.route');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/model3d', model3dRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Error handling
app.use(errorMiddleware);

module.exports = app;
