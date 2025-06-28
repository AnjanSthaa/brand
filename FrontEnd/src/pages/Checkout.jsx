import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  })

  useEffect(() => {
    fetchCartItems()
  }, [])

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
      setCartItems(data.data.items)
      setLoading(false)
      return data.data.items
    } catch (err) {
      setError(`Error fetching cart items: ${err.message}`)
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!cartItems.length) {
      setError('Your cart is empty')
      setLoading(false)
      return
    }

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
        })),
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.postalCode,
          country: formData.country,
        },
        deliveryMethod: 'standard',
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(orderData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Error creating order')
      }

      // Redirect to order confirmation page with payment options
      navigate(`/order-confirmation/${data.data._id}`)
    } catch (err) {
      setError(`Failed to place order: ${err.message}`)
      setLoading(false)
    }
  }

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
    const tax = subtotal * 0.085
    const shipping = 5
    return subtotal + tax + shipping
  }

  if (loading && !cartItems.length) {
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
              onClick={() => navigate('/')}
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
          <h1 className='text-4xl md:text-5xl font-bold mb-6'>Checkout</h1>
          <p className='text-gray-300 text-lg max-w-2xl'>
            Complete your purchase and we&apos;ll get your order ready for
            shipping.
          </p>
        </div>
      </div>

      <div className='container mx-auto px-4 py-16'>
        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 lg:grid-cols-3 gap-12'
        >
          {/* Order Summary */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Shipping Information */}
            <div className='bg-white rounded-lg shadow-lg p-8'>
              <h2 className='text-2xl font-bold mb-6'>Shipping Information</h2>
              <div className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label
                      htmlFor='firstName'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      First Name
                    </label>
                    <input
                      type='text'
                      id='firstName'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors'
                      placeholder='John'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='lastName'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Last Name
                    </label>
                    <input
                      type='text'
                      id='lastName'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors'
                      placeholder='Doe'
                    />
                  </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors'
                      placeholder='john@example.com'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Phone
                    </label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors'
                      placeholder='+1 234 567 8900'
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='address'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Address
                  </label>
                  <input
                    type='text'
                    id='address'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors'
                    placeholder='123 Main St'
                  />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                  <div>
                    <label
                      htmlFor='city'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      City
                    </label>
                    <input
                      type='text'
                      id='city'
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors'
                      placeholder='New York'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='state'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      State
                    </label>
                    <input
                      type='text'
                      id='state'
                      name='state'
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors'
                      placeholder='NY'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='postalCode'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      ZIP Code
                    </label>
                    <input
                      type='text'
                      id='postalCode'
                      name='postalCode'
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors'
                      placeholder='10001'
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='country'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Country
                  </label>
                  <input
                    type='text'
                    id='country'
                    name='country'
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors'
                    placeholder='USA'
                  />
                </div>
              </div>
            </div>

            {/* Order Information */}
            <div className='bg-white rounded-lg shadow-lg p-8'>
              <h2 className='text-2xl font-bold mb-6'>Order Information</h2>
              <div className='space-y-4'>
                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                    <svg
                      className='w-4 h-4 text-blue-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </div>
                  <div>
                    <p className='text-gray-900 font-medium'>
                      Order First, Pay Later
                    </p>
                    <p className='text-gray-600 text-sm'>
                      Your order will be placed without payment. You can choose
                      your payment method on the next page.
                    </p>
                  </div>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                    <svg
                      className='w-4 h-4 text-green-600'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </div>
                  <div>
                    <p className='text-gray-900 font-medium'>
                      Stock Reserved After Payment
                    </p>
                    <p className='text-gray-600 text-sm'>
                      Product stock will only be reserved after you complete the
                      payment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow-lg p-8 sticky top-8'>
              <h2 className='text-2xl font-bold mb-6'>Order Summary</h2>
              <div className='space-y-4 mb-6'>
                {cartItems.map((item) => (
                  <div
                    key={item.productId._id}
                    className='flex items-center space-x-4'
                  >
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
              <div className='border-t border-gray-200 pt-4 space-y-2'>
                <div className='flex justify-between text-gray-600'>
                  <span>Subtotal</span>
                  <span>
                    Rs.{' '}
                    {cartItems
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <div className='flex justify-between text-gray-600'>
                  <span>Shipping</span>
                  <span>Rs. 5.00</span>
                </div>
                <div className='flex justify-between text-gray-600'>
                  <span>Tax</span>
                  <span>
                    Rs.{' '}
                    {(
                      cartItems.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      ) * 0.085
                    ).toFixed(2)}
                  </span>
                </div>
                <div className='flex justify-between font-bold text-lg pt-2 border-t border-gray-200'>
                  <span>Total</span>
                  <span>Rs. {calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              <button
                type='submit'
                disabled={loading}
                className={`w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors mt-6
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout
