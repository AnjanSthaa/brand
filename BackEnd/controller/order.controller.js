import Order from '../models/order.model.js'
import Cart from '../models/cart.model.js'
import Product from '../models/product.model.js'

// Create new order (without payment)
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, deliveryMethod } = req.body
    const shippingCost = deliveryMethod === 'express' ? 15 : 5

    // Calculate total amount
    const totalAmount =
      items.reduce((total, item) => total + item.price * item.quantity, 0) +
      shippingCost

    // Create order without reserving stock yet
    const order = await Order.create({
      userId: req.user.id,
      items,
      shippingAddress,
      paymentMethod: 'pending',
      deliveryMethod,
      shippingCost,
      totalAmount,
      stockReserved: false,
    })

    console.log('Order created:', order)

    res.status(201).json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error('Order creation error:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating order',
    })
  }
}

// Process payment for an existing order
export const processPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body

    const order = await Order.findById(orderId)
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      })
    }

    // Check if order belongs to the authenticated user
    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order',
      })
    }

    // Check if order is still pending payment
    if (order.paymentMethod !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Order payment has already been processed',
      })
    }

    // Only handle cash on delivery payments
    if (paymentMethod === 'cash_on_delivery') {
      // Verify stock availability and reserve stock for cash on delivery
      for (const item of order.items) {
        const product = await Product.findById(item.productId)
        if (!product) {
          return res.status(400).json({
            success: false,
            message: `Product not found: ${item.productId}`,
          })
        }

        // Find the specific size in the product's sizes array
        const sizeIndex = product.sizes.findIndex((s) => s.name === item.size)

        if (sizeIndex === -1) {
          return res.status(400).json({
            success: false,
            message: `Size ${item.size} not found for product: ${product.name}`,
          })
        }

        if (
          !product.sizes[sizeIndex].inStock ||
          product.sizes[sizeIndex].stockAmount < item.quantity
        ) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for product: ${product.name} (${item.size})`,
          })
        }

        // Reserve stock
        product.sizes[sizeIndex].stockAmount -= item.quantity
        if (product.sizes[sizeIndex].stockAmount === 0) {
          product.sizes[sizeIndex].inStock = false
        }
        await product.save()
      }

      // Update order with payment method and mark stock as reserved
      order.paymentMethod = paymentMethod
      order.paymentStatus = 'pending' // Cash on delivery is pending until delivery
      order.stockReserved = true
      order.status = 'processing' // Move to processing status
      await order.save()

      // Clear the cart after successful payment processing
      await Cart.findOneAndUpdate(
        { userId: req.user.id },
        { $set: { items: [] } },
        { new: true }
      )

      res.status(200).json({
        success: true,
        data: order,
      })
    } else {
      return res.status(400).json({
        success: false,
        message: 'Only cash on delivery payments are supported',
      })
    }
  } catch (error) {
    console.error('Payment processing error:', error)
    res.status(500).json({
      success: false,
      message: 'Error processing payment',
    })
  }
}

// Get buyer's orders
export const getOrders = async (req, res) => {
  try {
    // Only show orders that have been properly finalized
    // This means orders with stock reserved and payment completed/pending
    const orders = await Order.find({
      userId: req.user.id,
      stockReserved: true, // Only show orders where stock has been reserved
    })
      .populate('items.productId')
      .sort('-createdAt')

    res.status(200).json({
      success: true,
      data: orders,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
    })
  }
}

// Get seller's orders
export const getSellerOrders = async (req, res) => {
  try {
    // Find all products by this seller
    const sellerProducts = await Product.find({ sellerId: req.user.id })
    const productIds = sellerProducts.map((product) => product._id)

    // Find orders containing these products that have been properly finalized
    const orders = await Order.find({
      'items.productId': { $in: productIds },
      stockReserved: true, // Only show orders where stock has been reserved
    })
      .populate('userId', 'name email')
      .populate('items.productId')
      .sort('-createdAt')

    res.status(200).json({
      success: true,
      data: orders,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching seller orders',
    })
  }
}

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params
    const { status } = req.body

    const order = await Order.findById(orderId)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      })
    }

    order.status = status
    await order.save()

    res.status(200).json({
      success: true,
      data: order,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
    })
  }
}

// Get order status
export const getOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params
    const order = await Order.findById(orderId)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      })
    }

    res.status(200).json({
      success: true,
      status: order.status,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order status',
    })
  }
}

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params
    const order = await Order.findById(orderId).populate('items.productId')

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      })
    }

    res.status(200).json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error('Error fetching order:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
    })
  }
}

// Get buyer's pending orders (orders that haven't been finalized yet)
export const getPendingOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user.id,
      stockReserved: false, // Show orders where stock hasn't been reserved yet
    })
      .populate('items.productId')
      .sort('-createdAt')

    res.status(200).json({
      success: true,
      data: orders,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pending orders',
    })
  }
}
