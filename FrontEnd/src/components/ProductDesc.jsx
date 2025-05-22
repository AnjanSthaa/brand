import { useParams, useNavigate } from 'react-router-dom' // Import useNavigate
import { useProductStore } from '../store/product'
import { useEffect, useState } from 'react'

export default function ProductDesc() {
  const { products, fetchProducts, loading } = useProductStore() // Add fetchProducts and loading
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [feedback, setFeedback] = useState({ type: '', message: '' })
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(null)

  const addToCart = async () => {
    try {
      if (!selectedSize) {
        setError('Please select a size')
        return
      }

      const token = localStorage.getItem('token')
      if (!token) {
        setError('Please login to add items to cart')
        return
      }

      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: quantity,
          size: selectedSize,
          price: parseFloat(product.price),
        }),
      })

      if (!response.ok) {
        const errorText = await response.text() // Read response as text
        throw new Error(errorText || 'Failed to add to cart')
      }

      const data = await response.json() // Parse response
      setFeedback({ type: 'success', message: 'Added to cart!' })
      setError(null)
    } catch (error) {
      console.error('Cart error:', error)
      setError(error.message || 'Failed to add to cart')
    }
  }

  useEffect(() => {
    if (feedback.message) {
      const timer = setTimeout(() => {
        setFeedback({ type: '', message: '' })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [feedback])
  // Fetch products if not already loaded
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts()
    } else {
      const foundProduct = products.find((p) => p._id === id) // Use only _id
      setProduct(foundProduct)
    }
  }, [products, id, fetchProducts])

  // Update the button click handler for size selection
  const handleSizeSelect = (sizeName) => {
    if (selectedSize === sizeName) {
      setSelectedSize(null) // Deselect if clicking the same size
    } else {
      setSelectedSize(sizeName)
      setError(null) // Clear any previous errors
    }
  }

  // Show loading state
  if (loading) {
    return <p className='text-center text-blue-500'>Loading...</p>
  }

  // Show product not found state
  if (!product) {
    return <p className='text-center text-red-500'>Product not found.</p>
  }

  // Render product details
  return (
    <div className='bg-gray-50 p-6 mt-6 sm:p-8 max-w-6xl mx-auto shadow-lg rounded-lg'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        <div className='rounded-lg overflow-hidden'>
          <img
            src={product.image}
            alt={`Image of ${product.name}`}
            className='w-full h-full object-cover'
          />
        </div>

        <div className='flex flex-col space-y-4'>
          <h1 className='text-3xl font-bold text-gray-900'>{product.name}</h1>
          <p className='text-xl font-semibold text-gray-800'>
            Price: {product.price}
          </p>
          <p className='text-sm text-gray-700'>
            {product.desc || 'No description available.'}
          </p>

          <div>
            <span className='text-sm font-medium text-gray-700 block mb-2'>
              Colors:
            </span>
            <div className='flex space-x-4'>
              {product.colors.map((color, index) => (
                <label key={index} className='flex items-center space-x-2'>
                  <input
                    type='radio'
                    name='color'
                    value={color.name}
                    className='w-4 h-4 text-blue-600 focus:ring-blue-500'
                  />
                  <span className='text-sm text-gray-700'>{color.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <span className='text-sm font-medium text-gray-700 block mb-2'>
              Sizes:
            </span>
            <div className='flex space-x-2'>
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 text-sm rounded border ${
                    size.inStock
                      ? selectedSize === size.name
                        ? 'border-blue-500 bg-blue-50 text-blue-700' // Selected state
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100' // Unselected state
                      : 'border-gray-300 bg-gray-200 text-gray-400 cursor-not-allowed' // Out of stock state
                  }`}
                  disabled={!size.inStock}
                  onClick={() => handleSizeSelect(size.name)}
                >
                  {size.name}
                  {size.stockAmount > 0 && (
                    <span className='ml-1 text-xs text-gray-500'>
                      ({size.stockAmount})
                    </span>
                  )}
                </button>
              ))}
            </div>
            {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
          </div>

          <div>
            <span className='text-sm font-medium text-gray-700'>
              Highlights:
            </span>
            <ul className='list-disc list-inside text-sm text-gray-600'>
              {product.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div className='mt-6 flex items-center space-x-4'>
            {/* Add quantity selector */}
            <div className='flex items-center space-x-2'>
              <label className='text-sm font-medium text-gray-700'>
                Quantity:
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className='border border-gray-300 rounded px-2 py-1'
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              className={`bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed`}
              onClick={addToCart}
              disabled={!selectedSize}
            >
              Add to Cart
            </button>

            <button
              className='bg-gray-200 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-300'
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
      {/* Feedback Messages */}
      {(feedback.message || error) && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out ${
            feedback.message ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {feedback.message || error}
        </div>
      )}
    </div>
  )
}
