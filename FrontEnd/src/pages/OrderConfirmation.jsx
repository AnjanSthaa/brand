import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import PaymentMethodSelector from '../components/PaymentMethodSelector'

const OrderConfirmation = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [processingPayment, setProcessingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState(null)

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

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method)
    setPaymentError(null)
  }

  const handleCashOnDelivery = async () => {
    setProcessingPayment(true)
    setPaymentError(null)

    try {
      const response = await fetch('/api/orders/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          orderId: order._id,
          paymentMethod: 'cash_on_delivery',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to process payment')
      }

      // Redirect to success page
      navigate(`/payment-success?orderId=${order._id}&method=cash_on_delivery`)
    } catch (err) {
      setPaymentError(err.message)
    } finally {
      setProcessingPayment(false)
    }
  }

  const handleEsewaPayment = async () => {
    setProcessingPayment(true)
    setPaymentError(null)

    try {
      // Initiate eSewa payment
      const response = await fetch('/api/payment/esewa/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          orderId: order._id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initiate eSewa payment')
      }

      // Create hidden form for eSewa submission
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = data.paymentUrl
      form.style.display = 'none'

      // Add fields in required order
      const addField = (name, value) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        input.value = value
        form.appendChild(input)
      }

      addField('amount', data.params.amount)
      addField('tax_amount', data.params.tax_amount)
      addField('total_amount', data.params.total_amount)
      addField('transaction_uuid', data.params.transaction_uuid)
      addField('product_code', data.params.product_code)
      addField('product_service_charge', data.params.product_service_charge)
      addField('product_delivery_charge', data.params.product_delivery_charge)
      addField('signed_field_names', data.params.signed_field_names)
      addField('signature', data.params.signature)
      addField('success_url', data.params.success_url)
      addField('failure_url', data.params.failure_url)

      document.body.appendChild(form)
      form.submit()
    } catch (err) {
      setPaymentError(err.message)
      setProcessingPayment(false)
    }
  }

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
            Your order has been placed successfully. Now choose your preferred
            payment method.
          </p>
        </div>
      </div>

      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-4xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Order Details */}
            <div className='space-y-8'>
              {/* Order Details Card */}
              <div className='bg-white rounded-lg shadow-lg p-8'>
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
                      Rs. {order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className='flex justify-between py-2 border-b border-gray-200'>
                    <span className='text-gray-600'>Payment Status</span>
                    <span className='font-medium capitalize'>
                      {order.paymentMethod === 'pending'
                        ? 'Pending Payment'
                        : order.paymentMethod}
                    </span>
                  </div>
                  <div className='flex justify-between py-2 border-b border-gray-200'>
                    <span className='text-gray-600'>Shipping Address</span>
                    <span className='font-medium text-right'>
                      {order.shippingAddress.street}
                      <br />
                      {order.shippingAddress.city},{' '}
                      {order.shippingAddress.state}{' '}
                      {order.shippingAddress.zipCode}
                      <br />
                      {order.shippingAddress.country}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className='bg-white rounded-lg shadow-lg p-8'>
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
                          Rs. {item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className='space-y-8'>
              <div className='bg-white rounded-lg shadow-lg p-8'>
                <h2 className='text-2xl font-bold mb-6'>
                  Choose Payment Method
                </h2>

                {paymentError && (
                  <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
                    <p className='text-red-600'>{paymentError}</p>
                  </div>
                )}

                <PaymentMethodSelector
                  onSelectPaymentMethod={handlePaymentMethodSelect}
                  selectedMethod={selectedPaymentMethod}
                />

                {/* Payment Action Buttons */}
                {selectedPaymentMethod && (
                  <div className='mt-8 space-y-4'>
                    {selectedPaymentMethod === 'cash_on_delivery' && (
                      <button
                        onClick={handleCashOnDelivery}
                        disabled={processingPayment}
                        className={`w-full bg-black text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                          processingPayment
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-gray-800 hover:shadow-lg transform hover:scale-[1.02]'
                        }`}
                      >
                        {processingPayment ? (
                          <div className='flex items-center justify-center space-x-3'>
                            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                            <span>Processing...</span>
                          </div>
                        ) : (
                          <div className='flex items-center justify-center space-x-3'>
                            <svg
                              className='w-6 h-6'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
                              />
                            </svg>
                            <span>
                              Pay Cash on Delivery - Rs.{' '}
                              {order.totalAmount.toFixed(2)}
                            </span>
                          </div>
                        )}
                      </button>
                    )}

                    {selectedPaymentMethod === 'esewa' && (
                      <button
                        onClick={handleEsewaPayment}
                        disabled={processingPayment}
                        className={`w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                          processingPayment
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-green-700 hover:shadow-lg transform hover:scale-[1.02]'
                        }`}
                      >
                        {processingPayment ? (
                          <div className='flex items-center justify-center space-x-3'>
                            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                            <span>Redirecting to eSewa...</span>
                          </div>
                        ) : (
                          <div className='flex items-center justify-center space-x-3'>
                            <div className='w-6 h-6 bg-white rounded flex items-center justify-center'>
                              <span className='text-green-600 text-sm font-bold'>
                                e
                              </span>
                            </div>
                            <span>
                              Pay with eSewa - Rs.{' '}
                              {order.totalAmount.toFixed(2)}
                            </span>
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                )}

                {/* Order Status Info */}
                <div className='mt-8 bg-blue-50 p-6 rounded-lg'>
                  <h3 className='font-semibold text-blue-900 mb-4'>
                    What happens next?
                  </h3>
                  <div className='space-y-3'>
                    <div className='flex items-start space-x-3'>
                      <div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                        <span className='text-sm font-bold text-blue-600'>
                          1
                        </span>
                      </div>
                      <div>
                        <p className='text-blue-800 font-medium'>
                          Complete Payment
                        </p>
                        <p className='text-blue-600 text-sm'>
                          Choose and complete your preferred payment method.
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start space-x-3'>
                      <div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                        <span className='text-sm font-bold text-blue-600'>
                          2
                        </span>
                      </div>
                      <div>
                        <p className='text-blue-800 font-medium'>
                          Stock Reserved
                        </p>
                        <p className='text-blue-600 text-sm'>
                          Product stock will be reserved after payment
                          confirmation.
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start space-x-3'>
                      <div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                        <span className='text-sm font-bold text-blue-600'>
                          3
                        </span>
                      </div>
                      <div>
                        <p className='text-blue-800 font-medium'>
                          Order Processing
                        </p>
                        <p className='text-blue-600 text-sm'>
                          Your order will be processed and shipped within 1-2
                          business days.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 mt-8 justify-center'>
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

export default OrderConfirmation
