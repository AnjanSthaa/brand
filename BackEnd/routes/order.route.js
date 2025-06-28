import express from 'express'
import {
  createOrder,
  processPayment,
  getOrders,
  getPendingOrders,
  getSellerOrders,
  updateOrderStatus,
  getOrderStatus,
  getOrderById,
} from '../controller/order.controller.js'
import { protect, authorize } from '../middleware/auth.middleware.js'

const router = express.Router()

// Buyer routes
router.post('/', protect, createOrder)
router.post('/process-payment', protect, processPayment)
router.get('/my-orders', protect, getOrders)
router.get('/pending-orders', protect, getPendingOrders)

// Seller routes
router.get('/seller-orders', protect, authorize('seller'), getSellerOrders)
router.patch(
  '/:orderId/status',
  protect,
  authorize('seller'),
  updateOrderStatus
)

// Add new route for getting order status
router.get('/:orderId/status', protect, getOrderStatus)

// Route to get an order by ID
router.get('/:orderId', getOrderById)

export default router
