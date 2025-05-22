import express from 'express'
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from '../controller/cart.controller.js'
import { protect } from '../middleware/auth.middleware.js'
const router = express.Router()

router.get('/', protect, getCart)
router.post('/add', protect, addToCart)
router.delete('/', protect, removeFromCart)
router.post('/clear', protect, clearCart)

export default router
