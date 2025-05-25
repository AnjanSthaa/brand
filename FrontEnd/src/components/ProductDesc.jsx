import { useParams, useNavigate } from 'react-router-dom'
import { useProductStore } from '../store/product'
import { useEffect, useState } from 'react'
import { ShoppingBag } from 'lucide-react'

export default function ProductDesc() {
  const { products, fetchProducts, loading } = useProductStore()
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
        const errorText = await response.text()
        throw new Error(errorText || 'Failed to add to cart')
      }

      await response.json()
      setFeedback({ type: 'success', message: 'Added to cart!' })
      setError(null)

      // Redirect to shop with highlight parameter
      setTimeout(() => {
        navigate('/shop?highlight=cart')
      }, 1000)
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

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts()
    } else {
      const foundProduct = products.find((p) => p._id === id)
      setProduct(foundProduct)
    }
  }, [products, id, fetchProducts])

  const handleSizeSelect = (sizeName) => {
    if (selectedSize === sizeName) {
      setSelectedSize(null)
    } else {
      setSelectedSize(sizeName)
      setError(null)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center font-poppins'>
        <div className='bg-white rounded-lg p-8 text-center'>
          <p className='text-gray-600'>Loading...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='min-h-screen flex items-center justify-center font-poppins'>
        <div className='bg-white rounded-lg p-8 text-center'>
          <ShoppingBag className='w-16 h-16 mx-auto text-gray-400 mb-4' />
          <p className='text-gray-600'>Product not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white font-poppins py-8'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='mb-8'>
          <h2 className='text-2xl font-semibold'>{product.name}</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='rounded-lg overflow-hidden'>
            <img
              src={product.image}
              alt={product.name}
              className='w-full h-full object-cover'
            />
          </div>

          <div className='space-y-6'>
            <div>
              <p className='text-2xl font-semibold text-gray-900'>
                Rs. {product.price}
              </p>
              <p className='text-gray-600 mt-2'>{product.desc}</p>
            </div>

            <div>
              <h3 className='text-sm font-medium text-gray-700 mb-3'>Colors</h3>
              <div className='flex gap-3'>
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className='w-8 h-8 rounded-full border-2 border-gray-200'
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className='text-sm font-medium text-gray-700 mb-3'>Sizes</h3>
              <div className='flex flex-wrap gap-2'>
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => handleSizeSelect(size.name)}
                    disabled={!size.inStock}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      size.inStock
                        ? selectedSize === size.name
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                        : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {size.name}
                    {size.stockAmount > 0 && (
                      <span className='ml-1 text-xs'>({size.stockAmount})</span>
                    )}
                  </button>
                ))}
              </div>
              {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
            </div>

            <div>
              <h3 className='text-sm font-medium text-gray-700 mb-3'>
                Highlights
              </h3>
              <ul className='list-disc list-inside text-gray-600 space-y-1'>
                {product.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className='flex items-center gap-4 pt-4'>
              <div className='flex items-center gap-2'>
                <label className='text-sm font-medium text-gray-700'>
                  Quantity:
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gray-300 focus:border-black'
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex gap-3 flex-1'>
                <button
                  onClick={addToCart}
                  disabled={!selectedSize}
                  className='w-[45%] bg-black hover:bg-white hover:text-black text-white px-6 py-2 rounded-lg shadow flex items-center justify-center space-x-2 focus:ring-2 focus:ring-gray-300 transition border border-black disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed'
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className='w-[45%] bg-black hover:bg-white hover:text-black text-white px-6 py-2 rounded-lg shadow flex items-center justify-center space-x-2 focus:ring-2 focus:ring-gray-300 transition border border-black'
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>

        {feedback.message && (
          <div
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out ${
              feedback.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  )
}
