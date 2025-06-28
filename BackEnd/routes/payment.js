import express from 'express'
import {
  createEsewaPaymentParams,
  verifyEsewaSignature,
} from '../services/esewaService.js'
import config from '../config/esewa.config.js'
import Order from '../models/order.model.js'
import Product from '../models/product.model.js'
import Cart from '../models/cart.model.js'

const router = express.Router()

// Function to reserve stock and finalize order
const reserveStockAndFinalizeOrder = async (order) => {
  try {
    // Reserve stock for each item in the order
    for (const item of order.items) {
      const product = await Product.findById(item.productId)
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`)
      }

      // Find the size in the product
      const sizeIndex = product.sizes.findIndex(
        (size) => size.name === item.size
      )
      if (sizeIndex === -1) {
        throw new Error(`Size not found: ${item.size}`)
      }

      // Check if enough stock is available
      if (product.sizes[sizeIndex].stockAmount < item.quantity) {
        throw new Error(
          `Insufficient stock for product: ${product.name} (${item.size})`
        )
      }

      // Reserve stock
      product.sizes[sizeIndex].stockAmount -= item.quantity
      if (product.sizes[sizeIndex].stockAmount === 0) {
        product.sizes[sizeIndex].inStock = false
      }
      await product.save()
    }

    // Update order status
    order.stockReserved = true
    order.status = 'processing'
    await order.save()

    // Clear the cart
    await Cart.findOneAndUpdate(
      { userId: order.userId },
      { $set: { items: [] } },
      { new: true }
    )

    return true
  } catch (error) {
    console.error('Error reserving stock:', error)
    throw error
  }
}

// Initiate eSewa payment
router.post('/esewa/initiate', async (req, res) => {
  try {
    console.log('eSewa payment initiation request received:', req.body)

    const { orderId } = req.body

    if (!orderId) {
      console.log('Missing orderId in request')
      return res.status(400).json({ error: 'Order ID is required' })
    }

    console.log('Looking for order with ID:', orderId)

    // Find the order
    const order = await Order.findById(orderId)
    if (!order) {
      console.log('Order not found:', orderId)
      return res.status(404).json({ error: 'Order not found' })
    }

    console.log(
      'Order found:',
      order._id,
      'Payment status:',
      order.paymentStatus
    )

    // Check if order is pending payment
    if (order.paymentStatus !== 'pending') {
      console.log('Order is not pending payment:', order.paymentStatus)
      return res.status(400).json({ error: 'Order is not pending payment' })
    }

    // Create eSewa payment parameters
    const paymentParams = createEsewaPaymentParams(order)
    console.log('Payment parameters created:', paymentParams)

    res.json({
      success: true,
      paymentUrl: config.paymentUrl,
      params: paymentParams,
    })
  } catch (error) {
    console.error('eSewa payment initiation error:', error)
    res.status(500).json({ error: 'Failed to initiate payment' })
  }
})

// eSewa success callback
router.post('/esewa/success', async (req, res) => {
  try {
    const formData = req.body

    // Extract required parameters
    const transactionUuid = formData.transaction_uuid
    const totalAmount = formData.total_amount
    const productCode = formData.product_code
    const receivedSignature = formData.signature
    const status = formData.status

    // Validate required parameters
    if (
      !transactionUuid ||
      !totalAmount ||
      !productCode ||
      !receivedSignature
    ) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/payment-failure?error=missing_params`
      )
    }

    // Find the order
    const order = await Order.findById(transactionUuid)
    if (!order) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/payment-failure?error=order_not_found`
      )
    }

    // Verify signature
    const isValidSignature = verifyEsewaSignature(formData, receivedSignature)
    if (!isValidSignature) {
      console.error('Invalid eSewa signature for order:', transactionUuid)
      return res.redirect(
        `${process.env.FRONTEND_URL}/payment-failure?error=invalid_signature`
      )
    }

    // Check if payment is complete
    if (status !== 'COMPLETE') {
      return res.redirect(
        `${process.env.FRONTEND_URL}/payment-failure?error=payment_incomplete`
      )
    }

    // Update order payment status
    order.paymentStatus = 'paid'
    order.paymentMethod = 'esewa'
    order.paymentDetails = {
      transactionId: formData.transaction_code,
      paymentDate: new Date(),
      amount: totalAmount,
    }
    await order.save()

    // Reserve stock and finalize order
    try {
      await reserveStockAndFinalizeOrder(order)
      console.log(
        'Stock reserved and order finalized for order:',
        transactionUuid
      )
    } catch (stockError) {
      console.error(
        'Failed to reserve stock for order:',
        transactionUuid,
        stockError
      )
      // Don't fail the entire request, but log the error
      // The order is still paid, just stock wasn't reserved
    }

    // Redirect to success page
    res.redirect(
      `${process.env.FRONTEND_URL}/payment-success?orderId=${order._id}&method=esewa`
    )
  } catch (error) {
    console.error('eSewa success callback error:', error)
    res.redirect(
      `${process.env.FRONTEND_URL}/payment-failure?error=server_error`
    )
  }
})

// eSewa failure callback
router.post('/esewa/failure', async (req, res) => {
  try {
    const formData = req.body
    const transactionUuid = formData.transaction_uuid

    if (transactionUuid) {
      // Update order payment status to failed
      const order = await Order.findById(transactionUuid)
      if (order) {
        order.paymentStatus = 'failed'
        order.paymentMethod = 'esewa'
        await order.save()
      }
    }

    res.redirect(
      `${process.env.FRONTEND_URL}/payment-failure?error=payment_failed`
    )
  } catch (error) {
    console.error('eSewa failure callback error:', error)
    res.redirect(
      `${process.env.FRONTEND_URL}/payment-failure?error=server_error`
    )
  }
})

// Check payment status
router.get('/esewa/status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params

    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    res.json({
      success: true,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
    })
  } catch (error) {
    console.error('Payment status check error:', error)
    res.status(500).json({ error: 'Failed to check payment status' })
  }
})

// Update order status from frontend (for eSewa payments)
router.post('/esewa/update-status', async (req, res) => {
  try {
    const { orderId, esewaData } = req.body

    if (!orderId || !esewaData) {
      return res
        .status(400)
        .json({ error: 'Order ID and eSewa data are required' })
    }

    // Find the order
    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    // Verify signature if available
    if (esewaData.signature) {
      const isValidSignature = verifyEsewaSignature(
        esewaData,
        esewaData.signature
      )
      if (!isValidSignature) {
        console.error('Invalid eSewa signature for order:', orderId)
        return res.status(400).json({ error: 'Invalid signature' })
      }
    }

    // Check if payment is complete
    if (esewaData.status !== 'COMPLETE') {
      return res.status(400).json({ error: 'Payment not complete' })
    }

    // Update order payment status
    order.paymentStatus = 'paid'
    order.paymentMethod = 'esewa'
    order.paymentDetails = {
      transactionId: esewaData.transaction_code || esewaData.transaction_uuid,
      paymentDate: new Date(),
      amount: parseFloat(esewaData.total_amount),
    }
    await order.save()

    // Reserve stock and finalize order
    try {
      await reserveStockAndFinalizeOrder(order)
      console.log('Stock reserved and order finalized for order:', orderId)
    } catch (stockError) {
      console.error('Failed to reserve stock for order:', orderId, stockError)
      // Don't fail the entire request, but log the error
      // The order is still paid, just stock wasn't reserved
    }

    res.json({ success: true, message: 'Order status updated successfully' })
  } catch (error) {
    console.error('Order status update error:', error)
    res.status(500).json({ error: 'Failed to update order status' })
  }
})

export default router
