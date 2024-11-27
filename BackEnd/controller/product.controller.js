import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.log("error in fetching products:", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const createProduct = async( req, res ) => {
    const product = req.body //the user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product)
    
    try {
        await newProduct.save()
        res.status(201).json({success: true, data: newProduct})
    } catch (error) {
        console.error("Error in Creating the product:", error.message);
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if(!deletedProduct){
            return res.status(404).json({success: false, message: "Product not found"})
        }

        res.status(200).json({ success: true, message: "Product Deleted"})
    } catch (error) {
        console.log("Error in deleting products", error.message);
        
        res.status(50049).json({success: false, message: "Server Error"})
    }
    
}

export const updatedProduct = async (req, res) => {
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product Id"})
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});

        if(!updatedProduct){
            return res.status(404).json({success: false, message: "Product not found"})
        }

        res.status(200).json({success: true, data: updatedProduct })
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"})
    }
}
