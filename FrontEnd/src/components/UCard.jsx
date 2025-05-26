import { Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useProductStore } from '../store/product'

const UCard = () => {
  const navigate = useNavigate()
  const { products, fetchProducts, loading, error } = useProductStore()
  const [wishlistItems, setWishlistItems] = useState([])
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  useEffect(() => {
    fetchProducts()
    fetchWishlist()
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

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch('/api/wishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) throw new Error('Failed to fetch wishlist')
      const data = await response.json()
      setWishlistItems(data.data.items.map((item) => item.productId._id))
    } catch (error) {
      console.error('Error fetching wishlist:', error)
    }
  }

  const handleCardClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  const toggleWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setFeedback({
          type: 'error',
          message: 'Please login to manage wishlist',
        })
        return
      }

      const isInWishlist = wishlistItems.includes(productId)
      const method = isInWishlist ? 'DELETE' : 'POST'

      const response = await fetch('/api/wishlist', {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(
          data.message ||
            `Failed to ${isInWishlist ? 'remove from' : 'add to'} wishlist`
        )
      }

      if (isInWishlist) {
        setWishlistItems((prev) => prev.filter((id) => id !== productId))
        setFeedback({ type: 'success', message: 'Removed from wishlist!' })
      } else {
        setWishlistItems((prev) => [...prev, productId])
        setFeedback({ type: 'success', message: 'Added to wishlist!' })
      }
    } catch (error) {
      setFeedback({ type: 'error', message: error.message })
    }
  }

  if (loading) {
    return (
      <div className='main-container flex justify-center items-center min-h-[200px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black'></div>
      </div>
    )
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className='w-full font-poppins relative'>
      <div className='w-full p-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-1.5 sm:gap-3 md:gap-4 my-4'>
        {products.map((item) => (
          <div
            key={item._id}
            className='group relative overflow-hidden shadow-md bg-black transition-transform duration-200 hover:shadow-lg hover:scale-105 cursor-pointer'
          >
            <div className='relative h-0 pb-[100%]'>
              <img
                className='absolute top-0 left-0 w-full h-full object-cover'
                src={item.image}
                alt={item.name}
                onClick={() => handleCardClick(item._id)}
              />
              {/* Overlay for name and price */}
              <div
                className='
                  absolute bottom-0 left-0 w-full
                  bg-gradient-to-t from-black/80 to-transparent
                  px-2 py-2
                  flex flex-col
                  opacity-100
                '
              >
                <h3 className='text-xs sm:text-sm text-white font-semibold truncate'>
                  {item.name}
                </h3>
                <p className='text-xs sm:text-sm text-white font-bold'>
                  Rs.{item.price}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleWishlist(item._id)
                }}
                className='absolute top-1 right-1 sm:top-2 sm:right-2 p-0.5 sm:p-1 transition-colors z-10'
              >
                <Heart
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                    wishlistItems.includes(item._id)
                      ? 'text-red-500 fill-red-500 stroke-black stroke-[1.5]'
                      : 'text-black fill-black stroke-white stroke-[1.5]'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Message */}
      {feedback.message && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out text-sm sm:text-base ${
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
