const Order = require('../models/order.model');

const createOrder = async (orderData) => {
    const order = new Order(orderData);
    return await order.save();
};

const getAllOrders = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const orders = await Order.find({})
        .populate('user', 'username email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Order.countDocuments({});

    return {
        orders,
        total,
        pages: Math.ceil(total / limit),
        currentPage: page
    };
};

const getOrderById = async (id) => {
    return await Order.findById(id).populate('user', 'username email');
};

const getMyOrders = async (userId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const orders = await Order.find({ user: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const total = await Order.countDocuments({ user: userId });

    return {
        orders,
        total,
        pages: Math.ceil(total / limit),
        currentPage: page
    };
};

const updateOrderStatus = async (id, statusData) => {
    const order = await Order.findById(id);
    if (!order) return null;

    order.status = statusData.status || order.status;

    if (statusData.status === 'Delivered') {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
    }

    if (statusData.isPaid) {
        order.isPaid = true;
        order.paidAt = Date.now();
    }

    return await order.save();
};

const deleteOrder = async (id) => {
    return await Order.findByIdAndDelete(id);
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getMyOrders,
    updateOrderStatus,
    deleteOrder,
};
