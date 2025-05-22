import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ContactInfo from '../components/ContactInfo'
import ShippingInfo from '../components/ShippingInfo'
import OrderSummary from '../components/OrderSummary'

const Checkout = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  })

  // Fetch cart items when component mounts
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
    } catch (error) {
      setError('Error fetching cart items')
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!cartItems.length) {
      setError('Your cart is empty')
      return
    }

    try {
      // Get cart items with their sizes
      const cartItems = await fetchCartItems()

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
        paymentMethod: 'card',
        deliveryMethod: 'standard',
        totalAmount: cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      }

      console.log(
        'Submitting order with data:',
        JSON.stringify(orderData, null, 2)
      )

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(orderData),
      })

      const data = await response.json()
      console.log('Server response:', data)

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Error creating order')
      }

      // Clear the cart after successful order
      const clearCartResponse = await fetch('/api/cart/clear', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!clearCartResponse.ok) {
        console.error('Failed to clear cart, but order was created')
      }

      navigate(`/order-confirmation/${data.data._id}`)
    } catch (error) {
      console.error('Order submission error details:', {
        message: error.message,
        stack: error.stack,
        orderData: formData,
        cartItems: cartItems,
      })
      setError(`Failed to place order: ${error.message}`)
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div className='text-red-500'>{error}</div>

  return (
    <div className='max-w-6xl mx-auto mt-10 p-4 sm:p-8 bg-white shadow-xl rounded-lg'>
      <form onSubmit={handleSubmit} className='flex flex-col md:flex-row gap-8'>
        <div className='flex-grow space-y-6 w-full md:w-3/5'>
          <ContactInfo formData={formData} onChange={handleInputChange} />
          <ShippingInfo formData={formData} onChange={handleInputChange} />
        </div>

        <div className='w-full md:w-2/5 space-y-4'>
          <OrderSummary />
          <button
            type='submit'
            disabled={loading}
            className={`w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg transition duration-200 ease-in-out shadow-md
              ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
          >
            {loading ? 'Processing...' : 'Confirm Order'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Checkout
