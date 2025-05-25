import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const OrderConfirmation = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Order not found')
          }
          throw new Error('Failed to fetch order details')
        }

        const data = await response.json()
        setOrder(data.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      fetchOrder()
    }
  }, [orderId])

  const handleContinueShopping = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
          <div className='text-center text-red-600'>
            <h1 className='text-2xl font-bold mb-4'>Error</h1>
            <p className='mb-6'>{error}</p>
            <button
              onClick={handleContinueShopping}
              className='w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors'
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!order) {
    return null
  }

  return (
    <div className='min-h-screen bg-gray-50 font-poppins'>
      {/* Hero Section */}
      <div className='bg-black text-white py-20'>
        <div className='container mx-auto px-4'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6'>
            Order Confirmed!
          </h1>
          <p className='text-gray-300 text-lg max-w-2xl'>
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
        </div>
      </div>

      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-3xl mx-auto'>
          {/* Order Details Card */}
          <div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
            <div className='flex items-center justify-center mb-8'>
              <div className='w-16 h-16 bg-black rounded-full flex items-center justify-center'>
                <svg
                  className='w-8 h-8 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </div>
            </div>
            <h2 className='text-2xl font-bold text-center mb-6'>
              Order #{order._id}
            </h2>
            <div className='space-y-4'>
              <div className='flex justify-between py-2 border-b border-gray-200'>
                <span className='text-gray-600'>Order Date</span>
                <span className='font-medium'>
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className='flex justify-between py-2 border-b border-gray-200'>
                <span className='text-gray-600'>Total Amount</span>
                <span className='font-medium'>
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
              <div className='flex justify-between py-2 border-b border-gray-200'>
                <span className='text-gray-600'>Payment Method</span>
                <span className='font-medium'>{order.paymentMethod}</span>
              </div>
              <div className='flex justify-between py-2 border-b border-gray-200'>
                <span className='text-gray-600'>Shipping Address</span>
                <span className='font-medium text-right'>
                  {order.shippingAddress.street}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.zipCode}
                  <br />
                  {order.shippingAddress.country}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
            <h2 className='text-2xl font-bold mb-6'>Order Items</h2>
            <div className='space-y-6'>
              {order.items.map((item) => (
                <div key={item._id} className='flex items-center space-x-4'>
                  <div className='w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0'>
                    {item.productId.image && (
                      <img
                        src={item.productId.image}
                        alt={item.productId.name}
                        className='w-full h-full object-cover rounded-lg'
                      />
                    )}
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-medium text-gray-900'>
                      {item.productId.name}
                    </h3>
                    <p className='text-sm text-gray-500'>
                      Quantity: {item.quantity}
                    </p>
                    <p className='text-gray-900 font-medium'>
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className='bg-white rounded-lg shadow-lg p-8'>
            <h2 className='text-2xl font-bold mb-6'>Next Steps</h2>
            <div className='space-y-6'>
              <div className='flex items-start space-x-4'>
                <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0'>
                  <svg
                    className='w-6 h-6 text-gray-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold text-gray-900'>
                    Order Confirmation Email
                  </h3>
                  <p className='text-gray-600'>
                    We&apos;ve sent a confirmation email with your order
                    details.
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-4'>
                <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0'>
                  <svg
                    className='w-6 h-6 text-gray-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold text-gray-900'>
                    Order Processing
                  </h3>
                  <p className='text-gray-600'>
                    Your order will be processed within 1-2 business days.
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-4'>
                <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0'>
                  <svg
                    className='w-6 h-6 text-gray-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
                    />
                  </svg>
                </div>
                <div>
                  <h3 className='font-semibold text-gray-900'>
                    Shipping Updates
                  </h3>
                  <p className='text-gray-600'>
                    You&apos;ll receive shipping updates via email once your
                    order is on its way.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 mt-8'>
            <button
              onClick={handleContinueShopping}
              className='bg-black hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg shadow flex items-center space-x-2 focus:ring-2 focus:ring-gray-300 transition border border-black'
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
