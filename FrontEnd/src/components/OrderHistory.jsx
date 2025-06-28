import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const OrderHistory = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders/my-orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }

      const data = await response.json()
      console.log('Fetched orders:', data.data)
      setOrders(data.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getExpectedArrivalDate = (orderDate) => {
    const orderDateTime = new Date(orderDate)
    // Add 3-5 days for delivery
    const minDeliveryDays = 3
    const maxDeliveryDays = 5

    const minDate = new Date(orderDateTime)
    minDate.setDate(minDate.getDate() + minDeliveryDays)

    const maxDate = new Date(orderDateTime)
    maxDate.setDate(maxDate.getDate() + maxDeliveryDays)

    return {
      min: minDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      max: maxDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    }
  }

  const getPaymentMethodText = (paymentMethod) => {
    switch (paymentMethod) {
      case 'esewa':
        return 'Paid via eSewa'
      case 'cash_on_delivery':
        return 'Pay cash on delivery'
      case 'pending':
        return 'Payment pending'
      default:
        return paymentMethod || 'Payment method not specified'
    }
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[200px]'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
        <p className='text-red-600'>Error: {error}</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className='bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px]'>
        <p className='text-gray-600 mb-4'>
          You haven&apos;t placed any orders yet.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className='bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors'
        >
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      {orders.map((order) => (
        <div
          key={order._id}
          className='bg-white shadow rounded-lg overflow-hidden'
        >
          {/* Order Header */}
          <div className='bg-gray-50 px-6 py-4 border-b border-gray-200'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
              <div className='mb-2 sm:mb-0'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  Order #{order._id.slice(-8)}
                </h3>
                <p className='text-sm text-gray-600'>
                  Placed on {formatDate(order.createdAt)}
                </p>
                <p className='text-sm text-gray-600'>
                  Expected arrival:{' '}
                  {getExpectedArrivalDate(order.createdAt).min} -{' '}
                  {getExpectedArrivalDate(order.createdAt).max}
                </p>
              </div>
              <div className='text-right'>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.paymentMethod === 'esewa'
                      ? 'bg-green-100 text-green-800'
                      : order.paymentMethod === 'cash_on_delivery'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {getPaymentMethodText(order.paymentMethod)}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className='px-6 py-4'>
            <div className='space-y-4'>
              {order.items.map((item, index) => (
                <div key={index} className='flex items-center space-x-4'>
                  <div className='w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0'>
                    {item.productId.image && (
                      <img
                        src={item.productId.image}
                        alt={item.productId.name}
                        className='w-full h-full object-cover rounded-lg'
                      />
                    )}
                  </div>
                  <div className='flex-1'>
                    <h4 className='font-medium text-gray-900'>
                      {item.productId.name}
                    </h4>
                    <p className='text-sm text-gray-600'>
                      Quantity: {item.quantity} | Size: {item.size}
                    </p>
                    <p className='text-sm font-medium text-gray-900'>
                      Rs. {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className='bg-gray-50 px-6 py-4 border-t border-gray-200'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
              <div className='mb-4 sm:mb-0'>
                <div className='text-sm text-gray-600'>
                  <p>
                    Shipping: {order.shippingAddress.street},{' '}
                    {order.shippingAddress.city}
                  </p>
                  <p>
                    Total:{' '}
                    <span className='font-semibold text-gray-900'>
                      Rs. {order.totalAmount.toFixed(2)}
                    </span>
                  </p>
                  <p>
                    Status:{' '}
                    <span
                      className={`font-semibold ${
                        order.paymentStatus === 'paid'
                          ? 'text-green-600'
                          : order.paymentStatus === 'pending'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {order.paymentStatus === 'paid'
                        ? 'Paid'
                        : order.paymentStatus === 'pending'
                        ? 'Pending'
                        : order.paymentStatus === 'failed'
                        ? 'Failed'
                        : order.paymentStatus}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderHistory
