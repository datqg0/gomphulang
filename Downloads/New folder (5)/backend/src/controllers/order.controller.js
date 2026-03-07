const orderService = require('../services/order.service');
const response = require('../utils/response');

const createOrder = async (req, res, next) => {
    try {
        const orderData = {
            ...req.body,
            user: req.user._id,
        };
        const order = await orderService.createOrder(orderData);
        res.status(201).json(response.success(order, 'Order created successfully', 201));
    } catch (error) {
        next(error);
    }
};

const getOrders = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await orderService.getAllOrders(page, limit);
        res.status(200).json(response.success(result, 'Orders fetched successfully'));
    } catch (error) {
        next(error);
    }
};

const getOrder = async (req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).json(response.error('Order not found', 404));
        }
        res.status(200).json(response.success(order, 'Order fetched successfully'));
    } catch (error) {
        next(error);
    }
};

const getMyOrders = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await orderService.getMyOrders(req.user._id, page, limit);
        res.status(200).json(response.success(result, 'My orders fetched successfully'));
    } catch (error) {
        next(error);
    }
};

const updateOrder = async (req, res, next) => {
    try {
        const order = await orderService.updateOrderStatus(req.params.id, req.body);
        if (!order) {
            return res.status(404).json(response.error('Order not found', 404));
        }
        res.status(200).json(response.success(order, 'Order updated successfully'));
    } catch (error) {
        next(error);
    }
};

const deleteOrder = async (req, res, next) => {
    try {
        const order = await orderService.deleteOrder(req.params.id);
        if (!order) {
            return res.status(404).json(response.error('Order not found', 404));
        }
        res.status(200).json(response.success(null, 'Order deleted successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    getMyOrders,
    updateOrder,
    deleteOrder,
};
