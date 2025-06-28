import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [esewaData, setEsewaData] = useState(null)

  const orderId = searchParams.get('orderId')
  const transactionId = searchParams.get('transactionId')
  const paymentMethod = searchParams.get('method') || 'cash_on_delivery'
  const esewaResponseData = searchParams.get('data') // eSewa sends Base64 encoded data

  useEffect(() => {
    const processEsewaResponse = async () => {
      if (esewaResponseData) {
        try {
          // Decode Base64 response from eSewa
          const decodedData = atob(esewaResponseData)
          const responseData = JSON.parse(decodedData)
          setEsewaData(responseData)

          console.log('eSewa response data:', responseData)

          // Extract order ID from eSewa response
          const esewaOrderId = responseData.transaction_uuid

          if (esewaOrderId) {
            // Update order status via backend
            await updateOrderStatus(esewaOrderId, responseData)
            // Fetch order details
            await fetchOrder(esewaOrderId)
          } else {
            setError('No order ID found in eSewa response')
            setLoading(false)
          }
        } catch (err) {
          console.error('Error processing eSewa response:', err)
          setError('Error processing payment response')
          setLoading(false)
        }
      } else if (orderId) {
        // Handle direct order ID (for cash on delivery)
        await fetchOrder(orderId)
      } else {
        setError('No order ID provided')
        setLoading(false)
      }
    }

    processEsewaResponse()
  }, [orderId, esewaResponseData])

  const updateOrderStatus = async (orderId, esewaData) => {
    try {
      const response = await fetch('/api/payment/esewa/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          orderId,
          esewaData,
        }),
      })

      if (!response.ok) {
        console.error('Failed to update order status')
      }
    } catch (err) {
      console.error('Error updating order status:', err)
    }
  }

  const fetchOrder = async (orderIdToFetch) => {
    try {
      const response = await fetch(`/api/orders/${orderIdToFetch}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!response.ok) {
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

  const handleContinueShopping = () => {
    navigate('/')
  }

  const handleViewOrders = () => {
    navigate('/profile')
    // Scroll to top after navigation
    window.scrollTo(0, 0)
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

  return (
    <div className='min-h-screen bg-gray-50 font-poppins'>
      {/* Hero Section */}
      <div className='bg-black text-white py-20'>
        <div className='container mx-auto px-4'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6'>
            Payment Successful!
          </h1>
          <p className='text-gray-300 text-lg max-w-2xl'>
            Thank you for your payment. Your order has been confirmed and is
            being processed.
          </p>
        </div>
      </div>

      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-3xl mx-auto'>
          {/* Success Card */}
          <div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
            <div className='flex items-center justify-center mb-8'>
              <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center'>
                <svg
                  className='w-10 h-10 text-green-600'
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
            <h2 className='text-3xl font-bold text-center mb-6 text-green-600'>
              Payment Completed Successfully
            </h2>

            <div className='space-y-4 mb-8'>
              {order && (
                <>
                  <div className='flex justify-between py-2 border-b border-gray-200'>
                    <span className='text-gray-600'>Order ID</span>
                    <span className='font-medium'>#{order._id}</span>
                  </div>
                  <div className='flex justify-between py-2 border-b border-gray-200'>
                    <span className='text-gray-600'>Total Amount</span>
                    <span className='font-medium'>
                      Rs. {order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className='flex justify-between py-2 border-b border-gray-200'>
                    <span className='text-gray-600'>Payment Method</span>
                    <span className='font-medium capitalize'>
                      {esewaData ? 'eSewa' : paymentMethod}
                    </span>
                  </div>
                  {esewaData && esewaData.transaction_code && (
                    <div className='flex justify-between py-2 border-b border-gray-200'>
                      <span className='text-gray-600'>
                        eSewa Transaction ID
                      </span>
                      <span className='font-medium'>
                        {esewaData.transaction_code}
                      </span>
                    </div>
                  )}
                  {esewaData && esewaData.transaction_uuid && (
                    <div className='flex justify-between py-2 border-b border-gray-200'>
                      <span className='text-gray-600'>Transaction UUID</span>
                      <span className='font-medium'>
                        {esewaData.transaction_uuid}
                      </span>
                    </div>
                  )}
                  {transactionId && !esewaData && (
                    <div className='flex justify-between py-2 border-b border-gray-200'>
                      <span className='text-gray-600'>Transaction ID</span>
                      <span className='font-medium'>{transactionId}</span>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className='bg-green-50 p-6 rounded-lg'>
              <h3 className='font-semibold text-green-900 mb-4'>
                What happens next?
              </h3>
              <div className='space-y-3'>
                <div className='flex items-start space-x-3'>
                  <div className='w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-sm font-bold text-green-600'>1</span>
                  </div>
                  <div>
                    <p className='text-green-800 font-medium'>
                      Order Confirmed
                    </p>
                    <p className='text-green-600 text-sm'>
                      Your order has been confirmed and stock has been reserved.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-sm font-bold text-green-600'>2</span>
                  </div>
                  <div>
                    <p className='text-green-800 font-medium'>Processing</p>
                    <p className='text-green-600 text-sm'>
                      Your order will be processed and prepared for shipping
                      within 1-2 business days.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-sm font-bold text-green-600'>3</span>
                  </div>
                  <div>
                    <p className='text-green-800 font-medium'>Shipping</p>
                    <p className='text-green-600 text-sm'>
                      You&apos;ll receive shipping updates via email once your
                      order is on its way.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button
              onClick={handleViewOrders}
              className='bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors'
            >
              View My Orders
            </button>
            <button
              onClick={handleContinueShopping}
              className='bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors'
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
