import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json()) //allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes)

//postman

app.listen(PORT, () => {
    console.log("the backend is running...")
    connectDB();
    console.log("server started at http://localhost:" + PORT);
    
})

