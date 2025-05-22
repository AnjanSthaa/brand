import Order from '../models/order.model.js'
import Cart from '../models/cart.model.js'
import Product from '../models/product.model.js'

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, deliveryMethod } = req.body
    const shippingCost = deliveryMethod === 'express' ? 15 : 5

    // Verify stock availability and update stock
    for (const item of items) {
      const product = await Product.findById(item.productId)
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product not found: ${item.productId}`,
        })
      }

      // Find the specific size in the product's sizes array
      const sizeIndex = product.sizes.findIndex((s) => s.name === item.size)

      // Debug logging
      console.log('Product:', product.name)
      console.log('Requested size:', item.size)
      console.log('Size index:', sizeIndex)
      console.log(
        'Available stock:',
        sizeIndex !== -1
          ? product.sizes[sizeIndex].stockAmount
          : 'Size not found'
      )
      console.log('Requested quantity:', item.quantity)

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

      // Update stock
      product.sizes[sizeIndex].stockAmount -= item.quantity
      if (product.sizes[sizeIndex].stockAmount === 0) {
        product.sizes[sizeIndex].inStock = false
      }
      await product.save()
    }

    const order = await Order.create({
      userId: req.user.id,
      items,
      shippingAddress,
      paymentMethod,
      deliveryMethod,
      shippingCost,
      totalAmount:
        items.reduce((total, item) => total + item.price * item.quantity, 0) +
        shippingCost,
    })

    console.log(order)

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

// Get buyer's orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
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

    // Find orders containing these products
    const orders = await Order.find({
      'items.productId': { $in: productIds },
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
