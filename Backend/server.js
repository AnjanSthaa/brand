import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js' // Ensure the .js extension is used in ES modules
import authRoutes from './routes/auth.js'

dotenv.config() // Load environment variables

const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/auth', authRoutes)

// Connect to DB and Start Server
connectDB()
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
