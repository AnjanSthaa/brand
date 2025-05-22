import { Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useProductStore } from '../store/product'

const UCard = () => {
  const navigate = useNavigate()
  const { products, fetchProducts, loading, error } = useProductStore()
  const [feedback, setFeedback] = useState({ type: '', message: '' })
  const [randomProducts, setRandomProducts] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])

  useEffect(() => {
    fetchProducts()
    fetchWishlist()
  }, [fetchProducts])

  // Get 10 random products when products array changes
  useEffect(() => {
    if (products.length > 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random())
      setRandomProducts(shuffled.slice(0, 10))
    }
  }, [products])

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

  const handleCardClick = (id) => {
    navigate(`/product/${id}`)
  }

  if (loading) return <p>Loading products...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className='main-container flex justify-left items-center font-poppins relative'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-6 px-4'>
        {randomProducts.map((item) => (
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
                onClick={(e) => {
                  e.stopPropagation()
                  toggleWishlist(item._id)
                }}
                className='absolute bottom-2 right-2 p-1 transition-colors'
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    wishlistItems.includes(item._id)
                      ? 'text-red-500 fill-red-500'
                      : 'text-gray-500 hover:text-red-500'
                  }`}
                />
              </button>
            </div>
            <div className='mt-2 p-2 flex justify-between items-center'>
              <p className='text-sm font-bold'>Rs.{item.price}</p>
              <h3 className='text-sm text-gray-700 truncate max-w-[60%]'>
                {item.name}
              </h3>
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
