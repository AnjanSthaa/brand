const PaymentMethodSelector = ({ onSelectPaymentMethod, selectedMethod }) => {
  const paymentMethods = [
    {
      id: 'cash_on_delivery',
      name: 'Cash on Delivery',
      description: 'Pay with cash when your order is delivered',
      icon: (
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
      ),
      features: [
        'No additional fees',
        'Pay when you receive your order',
        'Available nationwide',
      ],
    },
    {
      id: 'esewa',
      name: 'eSewa Digital Wallet',
      description: 'Pay securely with your eSewa account',
      icon: (
        <div className='w-6 h-6 bg-green-600 rounded flex items-center justify-center'>
          <span className='text-white text-xs font-bold'>e</span>
        </div>
      ),
      features: [
        'Instant payment processing',
        'Secure digital wallet',
        'Available 24/7',
        'No transaction fees',
      ],
    },
  ]

  return (
    <div className='space-y-4'>
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
            selectedMethod === method.id
              ? 'border-black bg-black text-white'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
          onClick={() => onSelectPaymentMethod(method.id)}
        >
          <div className='flex items-start space-x-4'>
            <div
              className={`flex-shrink-0 ${
                selectedMethod === method.id ? 'text-white' : 'text-gray-600'
              }`}
            >
              {method.icon}
            </div>
            <div className='flex-1'>
              <div className='flex items-center justify-between'>
                <h3
                  className={`font-semibold text-lg ${
                    selectedMethod === method.id
                      ? 'text-white'
                      : 'text-gray-900'
                  }`}
                >
                  {method.name}
                </h3>
                {selectedMethod === method.id && (
                  <div className='w-6 h-6 bg-white rounded-full flex items-center justify-center'>
                    <svg
                      className='w-4 h-4 text-black'
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
                )}
              </div>
              <p
                className={`mt-1 ${
                  selectedMethod === method.id
                    ? 'text-gray-200'
                    : 'text-gray-600'
                }`}
              >
                {method.description}
              </p>
              <div className='mt-4 space-y-2'>
                {method.features.map((feature, index) => (
                  <div key={index} className='flex items-center space-x-2'>
                    <svg
                      className={`w-4 h-4 ${
                        selectedMethod === method.id
                          ? 'text-green-300'
                          : 'text-green-500'
                      }`}
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
                    <span
                      className={`text-sm ${
                        selectedMethod === method.id
                          ? 'text-gray-200'
                          : 'text-gray-600'
                      }`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PaymentMethodSelector
