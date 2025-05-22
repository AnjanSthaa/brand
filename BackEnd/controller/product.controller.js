import Product from '../models/product.model.js'
import mongoose from 'mongoose'

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    console.log('error in fetching products:', error.message)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
}

export const createProduct = async (req, res) => {
  const product = req.body

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields',
    })
  }

  try {
    const newProduct = new Product({
      ...product,
      sellerId: req.user.id, // Add seller ID to product
    })

    await newProduct.save()
    res.status(201).json({
      success: true,
      data: newProduct,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    const deletedProduct = await Product.findByIdAndDelete(id)

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' })
    }

    res.status(200).json({ success: true, message: 'Product Deleted' })
  } catch (error) {
    console.log('Error in deleting products', error.message)

    res.status(500).json({ success: false, message: 'Server Error' })
  }
}

export const updatedProduct = async (req, res) => {
  const { id } = req.params

  // Validate the product ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid Product ID' })
  }

  // Extract fields from the request body
  const { name, price, image, desc, colors, sizes, highlights } = req.body

  // Prepare the fields to be updated
  const productUpdate = {
    ...(name && { name }),
    ...(price && { price }),
    ...(image && { image }),
    ...(desc && { desc }),
    ...(colors && { colors }),
    ...(sizes && { sizes }),
    ...(highlights && { highlights }),
  }

  try {
    // Update the product and return the updated document
    const updatedProduct = await Product.findByIdAndUpdate(id, productUpdate, {
      new: true, // Return the updated document
    })

    // Check if the product exists
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' })
    }

    // Respond with the updated product
    res.status(200).json({ success: true, data: updatedProduct })
  } catch (error) {
    console.error('Error updating product:', error.message)
    res.status(500).json({ success: false, message: 'Server Error' })
  }
}
