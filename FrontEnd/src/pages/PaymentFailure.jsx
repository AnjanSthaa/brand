import { useSearchParams, useNavigate } from 'react-router-dom'

const PaymentFailure = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const error = searchParams.get('error')
  const orderId = searchParams.get('orderId')

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'no_data':
        return 'No payment data received from the payment gateway.'
      case 'invalid_signature':
        return 'Payment verification failed due to invalid signature.'
      case 'transaction_incomplete':
        return 'The payment transaction was not completed successfully.'
      case 'payment_not_found':
        return 'Payment record not found in our system.'
      case 'payment_failed':
        return 'The payment was declined or failed to process.'
      case 'processing_error':
        return 'An error occurred while processing your payment.'
      default:
        return 'Your payment could not be processed. Please try again.'
    }
  }

  const handleTryAgain = () => {
    if (orderId) {
      navigate(`/order-confirmation/${orderId}`)
    } else {
      navigate('/')
    }
  }

  const handleContinueShopping = () => {
    navigate('/')
  }

  const handleContactSupport = () => {
    navigate('/contactPage')
  }

  return (
    <div className='min-h-screen bg-gray-50 font-poppins'>
      {/* Hero Section */}
      <div className='bg-black text-white py-20'>
        <div className='container mx-auto px-4'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6'>
            Payment Failed
          </h1>
          <p className='text-gray-300 text-lg max-w-2xl'>
            We&apos;re sorry, but your payment could not be processed. Please
            try again or contact support.
          </p>
        </div>
      </div>

      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-3xl mx-auto'>
          {/* Failure Card */}
          <div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
            <div className='flex items-center justify-center mb-8'>
              <div className='w-20 h-20 bg-red-100 rounded-full flex items-center justify-center'>
                <svg
                  className='w-10 h-10 text-red-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </div>
            </div>
            <h2 className='text-3xl font-bold text-center mb-6 text-red-600'>
              Payment Could Not Be Completed
            </h2>

            <div className='bg-red-50 p-6 rounded-lg mb-8'>
              <h3 className='font-semibold text-red-900 mb-4'>
                What went wrong?
              </h3>
              <p className='text-red-800 mb-4'>{getErrorMessage(error)}</p>
              <div className='space-y-3'>
                <div className='flex items-start space-x-3'>
                  <div className='w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-sm font-bold text-red-600'>!</span>
                  </div>
                  <div>
                    <p className='text-red-800 font-medium text-sm'>
                      No charges were made
                    </p>
                    <p className='text-red-600 text-sm'>
                      Your account has not been charged for this transaction.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-sm font-bold text-red-600'>!</span>
                  </div>
                  <div>
                    <p className='text-red-800 font-medium text-sm'>
                      Order is still pending
                    </p>
                    <p className='text-red-600 text-sm'>
                      Your order is still available and you can try payment
                      again.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-blue-50 p-6 rounded-lg'>
              <h3 className='font-semibold text-blue-900 mb-4'>
                What you can do:
              </h3>
              <div className='space-y-3'>
                <div className='flex items-start space-x-3'>
                  <div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-sm font-bold text-blue-600'>1</span>
                  </div>
                  <div>
                    <p className='text-blue-800 font-medium'>Try Again</p>
                    <p className='text-blue-600 text-sm'>
                      Attempt the payment again with the same or different
                      payment method.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-sm font-bold text-blue-600'>2</span>
                  </div>
                  <div>
                    <p className='text-blue-800 font-medium'>
                      Check Payment Method
                    </p>
                    <p className='text-blue-600 text-sm'>
                      Ensure your payment method has sufficient funds and is
                      valid.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='text-sm font-bold text-blue-600'>3</span>
                  </div>
                  <div>
                    <p className='text-blue-800 font-medium'>Contact Support</p>
                    <p className='text-blue-600 text-sm'>
                      If the problem persists, contact our customer support
                      team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            {orderId && (
              <button
                onClick={handleTryAgain}
                className='bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors'
              >
                Try Payment Again
              </button>
            )}
            <button
              onClick={handleContactSupport}
              className='bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors'
            >
              Contact Support
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

export default PaymentFailure
