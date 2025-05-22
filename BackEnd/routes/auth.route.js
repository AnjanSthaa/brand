import express from 'express'
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserRole,
} from '../controller/auth.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/profile', protect, getUserProfile)
router.put('/role', protect, updateUserRole)

export default router
