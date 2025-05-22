import mongoose from 'mongoose'

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

// Index to prevent duplicates in wishlist for the same user
wishlistSchema.index({ userId: 1, 'items.productId': 1 }, { unique: true })

const Wishlist = mongoose.model('Wishlist', wishlistSchema)
export default Wishlist
