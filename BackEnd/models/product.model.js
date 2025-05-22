import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    desc: {
      type: String, // Optional detailed description
    },
    colors: [
      {
        name: { type: String, required: true }, // Color name
        hex: { type: String, required: false, default: '#FFFFFF' }, // Hexadecimal color code
      },
    ],
    sizes: [
      {
        name: String,
        inStock: Boolean,
        stockAmount: {
          // Add this field
          type: Number,
          default: 1,
        },
      },
    ],
    highlights: {
      type: [String], // Array of highlights
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
