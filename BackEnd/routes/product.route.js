import express from 'express'
import { getProducts, createProduct, deleteProduct, updatedProduct } from '../controller/product.controller.js'

const router = express.Router();


router.get("/", getProducts)

router.post("/", createProduct)

router.delete("/:id", deleteProduct)

// put is used for changing all the data and patch is used to change only specific data
router.put("/:id", updatedProduct)

export default router;