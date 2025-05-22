import express from 'express'
import {
  getProducts,
  createProduct,
  deleteProduct,
  updatedProduct,
} from '../controller/product.controller.js'
import { protect, authorize } from '../middleware/auth.middleware.js'

const router = express.Router()

// Allow all authenticated users to view products
router.get('/', getProducts)

// Restrict these operations to sellers only
router.post('/', protect, authorize('seller'), createProduct)
router.delete('/:id', protect, authorize('seller'), deleteProduct)
router.put('/:id', protect, authorize('seller'), updatedProduct)

export default router
