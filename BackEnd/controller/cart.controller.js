import Cart from '../models/cart.model.js'
import Product from '../models/product.model.js'

// Get Cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id }).populate(
      'items.productId'
    )

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] })
      await cart.save()
    }

    res.status(200).json({
      success: true,
      data: cart,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}

// Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, size, price } = req.body

    // Validate product and size existence
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    // Find the specific size in product
    const sizeInfo = product.sizes.find((s) => s.name === size)
    if (!sizeInfo) {
      return res.status(400).json({
        success: false,
        message: 'Selected size not found',
      })
    }

    // Check if size is in stock and has sufficient quantity
    if (!sizeInfo.inStock || sizeInfo.stockAmount < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Selected size is out of stock or insufficient quantity',
      })
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId: req.user.id })
    if (!cart) {
      cart = await Cart.create({
        userId: req.user.id,
        items: [],
      })
    }

    // Check if item with same product and size exists
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    )

    if (existingItemIndex > -1) {
      // Update quantity if item exists
      const newQuantity = cart.items[existingItemIndex].quantity + quantity
      if (newQuantity > sizeInfo.stockAmount) {
        return res.status(400).json({
          success: false,
          message: 'Cannot add more items than available in stock',
        })
      }
      cart.items[existingItemIndex].quantity = newQuantity
    } else {
      // Add new item
      cart.items.push({
        productId,
        quantity,
        size,
        price,
      })
    }

    await cart.save()

    res.status(200).json({
      success: true,
      message: 'Item added to cart successfully',
      data: cart,
    })
  } catch (error) {
    console.error('Add to cart error:', error)
    res.status(500).json({
      success: false,
      message: 'Error adding item to cart',
    })
  }
}

// Remove from Cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.body
  try {
    const cart = await Cart.findOne({ userId: req.user.id })

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({
        success: false,
        message: cart ? 'No items to remove' : 'Cart not found',
      })
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    )
    await cart.save()

    res.status(200).json({
      success: true,
      cartItems: cart,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' })
  }
}

// Add clear cart endpoint
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })

    if (cart) {
      cart.items = []
      await cart.save()
    }

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}
