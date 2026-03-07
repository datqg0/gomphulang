const express = require('express');
const orderController = require('../controllers/order.controller');
const { protect, admin } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', protect, orderController.getOrders);
router.post('/', protect, orderController.createOrder);
router.get('/myorders', protect, orderController.getMyOrders);
router.get('/:id', protect, orderController.getOrder);
router.put('/:id', protect, orderController.updateOrder);
router.delete('/:id', protect, orderController.deleteOrder);


module.exports = router;
