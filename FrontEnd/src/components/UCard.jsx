import { Heart, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useProductStore } from '../store/product'

const UCard = () => {
  const navigate = useNavigate()
  const { products, fetchProducts, loading, error } = useProductStore()
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Clear feedback after 3 seconds
  useEffect(() => {
    if (feedback.message) {
      const timer = setTimeout(() => {
        setFeedback({ type: '', message: '' })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [feedback])

  const addToCart = async (productId) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      })

      if (!response.ok) {
        throw new Error('Failed to add to cart')
      }

      setFeedback({ type: 'success', message: 'Added to cart!' })
    } catch (error) {
      setFeedback({ type: 'error', message: error.message })
    }
  }

  const addToWishlist = async (productId) => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ productId }),
      })

      if (!response.ok) {
        throw new Error('Failed to add to wishlist')
      }

      setFeedback({ type: 'success', message: 'Added to wishlist!' })
    } catch (error) {
      setFeedback({ type: 'error', message: error.message })
    }
  }

  const handleCardClick = (id) => {
    navigate(`/product/${id}`)
  }

  if (loading) return <p>Loading products...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className='main-container flex justify-left items-center font-poppins relative'>
      <div className='w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-6 px-4'>
        {products.map((item) => (
          <div
            key={item._id}
            className='relative max-w-sm rounded-lg overflow-hidden shadow-md bg-white transition-transform duration-200 hover:shadow-lg hover:scale-105 cursor-pointer'
          >
            <div className='relative h-0 pb-[75%]'>
              <img
                className='absolute top-0 left-0 w-full h-full object-cover rounded-t-lg'
                src={item.image}
                alt={item.name}
                onClick={() => handleCardClick(item._id)}
              />
              <button
                onClick={() => addToWishlist(item._id)}
                className='absolute bottom-2 right-2 bg-white rounded-full p-1 shadow hover:shadow-md transition-colors'
              >
                <Heart className='w-5 h-5 text-gray-500 hover:text-red-500' />
              </button>
              <button
                onClick={() => addToCart(item._id)}
                className='absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:shadow-md'
              >
                <Plus className='w-5 h-5 text-gray-500' />
              </button>
            </div>
            <div className='mt-2 p-2 flex justify-between'>
              <div>
                <h3 className='text-sm text-gray-700'>{item.name}</h3>
              </div>
              <p className='text-sm font-bold'>Rs.{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Message */}
      {feedback.message && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out ${
            feedback.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {feedback.message}
        </div>
      )}
    </div>
  )
}

export default UCard
