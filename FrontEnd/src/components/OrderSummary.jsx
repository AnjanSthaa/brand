import { useState, useEffect } from 'react'

const OrderSummary = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCartItems = async () => {
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
        // Ensure items is always an array
        setCartItems(data.data?.items || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCartItems()
  }, [])

  // Calculate subtotal and total
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + (item.productId?.price || 0) * (item.quantity || 0),
    0
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='bg-gray-50 p-8 rounded-lg shadow-lg space-y-6'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
        Order Summary
      </h2>

      {/* Items Section */}
      <div className='space-y-5'>
        {cartItems.map((item) => (
          <div
            key={item._id || Math.random().toString()}
            className='flex items-center justify-between border-b pb-4'
          >
            <div className='flex items-center space-x-4'>
              <img
                src={item.productId?.image || '/placeholder-image.jpg'}
                alt={item.productId?.name || 'Product'}
                className='w-16 h-16 rounded-md object-cover'
              />
              <div>
                <h3 className='text-gray-800 font-medium'>
                  {item.productId?.name || 'Product Name'}
                </h3>
                <p className='text-gray-600'>Quantity: {item.quantity || 0}</p>
              </div>
            </div>
            <span className='text-gray-700 font-semibold'>
              $
              {((item.productId?.price || 0) * (item.quantity || 0)).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Pricing Section */}
      <div className='pt-4 space-y-2'>
        <div className='flex justify-between text-lg font-bold'>
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>

      {(!cartItems || cartItems.length === 0) && (
        <div className='text-center text-gray-500 py-4'>Your cart is empty</div>
      )}
    </div>
  )
}

export default OrderSummary
