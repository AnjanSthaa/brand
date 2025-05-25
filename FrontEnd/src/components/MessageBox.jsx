const MessageBox = () => {
  return (
    <div className='min-h-screen bg-gray-50 font-poppins'>
      {/* Hero Section */}
      <div className='bg-black text-white py-20'>
        <div className='container mx-auto px-4'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6'>Messages</h1>
          <p className='text-gray-300 text-lg max-w-2xl'>
            Stay connected with your orders and updates through our messaging
            system.
          </p>
        </div>
      </div>

      <div className='container mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Message List */}
          <div className='lg:col-span-1 bg-white rounded-lg shadow-lg p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-semibold'>Conversations</h2>
              <button className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                <svg
                  className='w-5 h-5 text-gray-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 4v16m8-8H4'
                  />
                </svg>
              </button>
            </div>
            <div className='space-y-4'>
              {/* Sample Messages - Replace with actual data */}
              <div className='flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors'>
                <div className='w-12 h-12 bg-gray-200 rounded-full flex-shrink-0'></div>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center justify-between'>
                    <p className='font-medium text-gray-900 truncate'>
                      Order #12345
                    </p>
                    <span className='text-sm text-gray-500'>2h ago</span>
                  </div>
                  <p className='text-sm text-gray-500 truncate'>
                    Your order has been shipped
                  </p>
                </div>
              </div>
              <div className='flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors'>
                <div className='w-12 h-12 bg-gray-200 rounded-full flex-shrink-0'></div>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center justify-between'>
                    <p className='font-medium text-gray-900 truncate'>
                      Support Team
                    </p>
                    <span className='text-sm text-gray-500'>1d ago</span>
                  </div>
                  <p className='text-sm text-gray-500 truncate'>
                    How can we help you today?
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className='lg:col-span-2 bg-white rounded-lg shadow-lg p-6'>
            <div className='flex items-center space-x-4 mb-6'>
              <div className='w-12 h-12 bg-gray-200 rounded-full flex-shrink-0'></div>
              <div>
                <h3 className='font-semibold text-gray-900'>Order #12345</h3>
                <p className='text-sm text-gray-500'>
                  Last updated 2 hours ago
                </p>
              </div>
            </div>
            <div className='space-y-4 mb-6'>
              {/* Sample Messages - Replace with actual data */}
              <div className='flex items-start space-x-4'>
                <div className='w-8 h-8 bg-gray-200 rounded-full flex-shrink-0'></div>
                <div className='flex-1 bg-gray-50 rounded-lg p-4'>
                  <p className='text-sm text-gray-900'>
                    Your order has been shipped and is on its way!
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>2 hours ago</p>
                </div>
              </div>
              <div className='flex items-start space-x-4'>
                <div className='w-8 h-8 bg-gray-200 rounded-full flex-shrink-0'></div>
                <div className='flex-1 bg-gray-50 rounded-lg p-4'>
                  <p className='text-sm text-gray-900'>
                    Thank you for your order. We&apos;re processing it now.
                  </p>
                  <p className='text-xs text-gray-500 mt-1'>1 day ago</p>
                </div>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <input
                type='text'
                placeholder='Type your message...'
                className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors'
              />
              <button className='p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors'>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageBox
