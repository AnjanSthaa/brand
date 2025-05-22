import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'

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
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow'>
        <div className='text-center text-red-600'>
          <h1 className='text-2xl font-bold mb-2'>Error</h1>
          <p>{error}</p>
          <button
            onClick={handleContinueShopping}
            className='mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow'>
      <div className='text-center mb-8'>
        <CheckCircle className='w-16 h-16 text-green-500 mx-auto mb-4' />
        <h1 className='text-3xl font-bold text-green-600 mb-2'>
          Order Confirmed!
        </h1>
        <p className='text-gray-600'>
          Thank you for your order. Your order number is #{orderId}
        </p>
      </div>

      {order && (
        <div className='space-y-6'>
          <div className='border-t pt-4'>
            <h2 className='text-xl font-semibold mb-4'>Order Details</h2>
            <div className='space-y-4'>
              {/* Shipping Information */}
              <div>
                <h3 className='font-medium text-gray-700'>Shipping Address</h3>
                <p className='text-gray-600'>
                  {order.shippingAddress?.street}
                  <br />
                  {order.shippingAddress?.city}, {order.shippingAddress?.state}{' '}
                  {order.shippingAddress?.zipCode}
                  <br />
                  {order.shippingAddress?.country}
                </p>
              </div>

              {/* Order Items */}
              <div>
                <h3 className='font-medium text-gray-700 mb-2'>Items</h3>
                <div className='space-y-2'>
                  {order.items?.map((item, index) => (
                    <div
                      key={item._id || index}
                      className='flex justify-between items-center'
                    >
                      <div className='flex items-center space-x-4'>
                        <img
                          src={item.productId?.image}
                          alt={item.productId?.name}
                          className='w-16 h-16 object-cover rounded'
                          onError={(e) => {
                            e.target.src = '/placeholder-image.jpg'
                          }}
                        />
                        <div>
                          <p className='font-medium'>{item.productId?.name}</p>
                          <p className='text-gray-500'>
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className='font-medium'>
                        ${(item.productId?.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='mt-8 text-center'>
        <button
          onClick={handleContinueShopping}
          className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default OrderConfirmation
