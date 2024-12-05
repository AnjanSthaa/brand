import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// Signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body
  try {
    const userExists = await User.findOne({ email })
    if (userExists)
      return res.status(400).json({ message: 'Email already in use.' })

    const user = new User({ username, email, password })
    await user.save()
    res.status(201).json({ message: 'User created successfully.' })
  } catch (err) {
    res.status(500).json({ message: 'Server error.' })
  }
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found.' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials.' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    res.status(200).json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Server error.' })
  }
})

export default router
