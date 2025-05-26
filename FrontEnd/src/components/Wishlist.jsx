import { useState, useEffect } from 'react'
import WCard from './WCard'

const Wishlist = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Please login to view your wishlist')
        setLoading(false)
        return
      }

      const response = await fetch('/api/wishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status === 401) {
        setError('Please login to view your wishlist')
      } else if (!response.ok) {
        throw new Error('Failed to fetch wishlist data')
      }

      const data = await response.json()
      console.log('Wishlist data:', data) // Debug log

      if (data && data.data && Array.isArray(data.data.items)) {
        setItems(data.data.items)
      } else {
        setItems([])
        setError('No items found in wishlist.')
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Please login to manage your wishlist')
        return
      }

      const response = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      })

      if (!response.ok) {
        throw new Error('Failed to remove item')
      }

      setItems(items.filter((item) => item.productId._id !== productId))
    } catch (error) {
      console.error('Error removing item:', error)
      setError(error.message)
    }
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[200px]'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='container mx-auto mt-10 text-center text-red-500'>
        {error}
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <div className='container mx-auto mt-10 text-center'>
        No items in your wishlist.
      </div>
    )
  }

  console.log('Rendering items:', items) // Debug log

  return (
    <div className='pt-2 min-h-screen font-poppins'>
      <div className='w-full mt-2 px-4 max-w-screen mx-auto'>
        <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-4 md:gap-6 mb-2'>
          {items.map((item) => {
            console.log('Item being rendered:', item) // Debug log
            return (
              <WCard
                key={item.productId._id}
                item={item}
                onRemove={handleRemove}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Wishlist
