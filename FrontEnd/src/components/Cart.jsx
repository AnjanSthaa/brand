import { X as XIcon, Trash2, ShoppingBag } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cart({ open, onClose }) {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (open) {
      fetchCartItems()
    }
  }, [open])

  const fetchCartItems = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/cart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch cart items')
      }

      const data = await response.json()
      setProducts(data.data?.items || [])
    } catch (error) {
      console.error('Error:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  const clearCart = async () => {
    try {
      const response = await fetch('/api/cart/clear', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to clear cart')
      }

      fetchCartItems()
    } catch (error) {
      setError(error.message || 'Failed to clear cart')
    }
  }

  const removeItem = async (productId) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ productId }),
      })

      if (!response.ok) {
        throw new Error('Failed to remove item')
      }

      // Update local state immediately for better UX
      setProducts(products.filter((item) => item.productId._id !== productId))
    } catch (error) {
      setError(error.message || 'Failed to remove item')
    }
  }

  if (!open) return null

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 font-poppins'
      role='dialog'
      aria-modal='true'
    >
      <div className='bg-white rounded-lg shadow-lg w-full max-w-2xl p-8 mx-4'>
        <div className='flex justify-between items-center border-b pb-6'>
          <h2 className='text-2xl font-semibold'>Shopping Cart</h2>
          <button
            onClick={onClose}
            className='hover:text-red-900 transition-colors'
          >
            <XIcon className='w-6 h-6' />
          </button>
        </div>

        <div className='mt-6 max-h-[60vh] overflow-y-auto'>
          {loading && (
            <div className='text-center py-8 text-gray-600'>
              Loading cart...
            </div>
          )}

          {error && (
            <div className='text-center py-8 text-red-500'>{error}</div>
          )}

          {!loading && !error && products.length === 0 ? (
            <div className='text-center py-12'>
              <ShoppingBag className='w-16 h-16 mx-auto text-gray-400 mb-4' />
              <p className='text-gray-600 text-lg'>Your cart is empty</p>
            </div>
          ) : (
            <div className='space-y-6'>
              {products.map((product) => (
                <div
                  key={product.productId._id}
                  className='flex items-center gap-6 py-4 border-b last:border-none'
                >
                  <img
                    src={product.productId.image}
                    alt={product.productId.name}
                    className='w-28 h-28 object-cover rounded-md'
                  />
                  <div className='flex-grow'>
                    <h3 className='text-lg font-medium text-gray-900'>
                      {product.productId.name}
                    </h3>
                    <p className='text-base text-gray-500 mt-1'>
                      Quantity: {product.quantity}
                    </p>
                    <p className='text-lg font-semibold text-gray-900 mt-2'>
                      Rs.
                      {(product.productId.price * product.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(product.productId._id)}
                    className='p-2 text-gray-400 hover:text-red-600 transition-colors'
                    aria-label='Remove item'
                  >
                    <XIcon className='w-5 h-5' />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {!loading && !error && products.length > 0 && (
          <div className='mt-8 space-y-4'>
            <div className='flex gap-3 justify-end'>
              <button
                onClick={handleCheckout}
                className='w-[29%] bg-black hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg shadow flex items-center justify-center space-x-2 focus:ring-2 focus:ring-gray-300 transition border border-black'
              >
                Checkout
              </button>
              <button
                onClick={clearCart}
                className='w-[9%] bg-red-600 hover:bg-white hover:text-red-600 text-white px-4 py-2 rounded-lg shadow flex items-center justify-center focus:ring-2 focus:ring-red-300 transition border border-red-600'
              >
                <Trash2 className='w-5 h-5' />
              </button>
            </div>

            <div className='flex justify-end'>
              <button
                onClick={onClose}
                className='w-[40%] bg-black hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg shadow flex items-center justify-center space-x-2 focus:ring-2 focus:ring-gray-300 transition border border-black'
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
