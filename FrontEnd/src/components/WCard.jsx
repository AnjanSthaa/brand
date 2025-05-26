import { X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const WCard = ({ item, onRemove }) => {
  const navigate = useNavigate()

  console.log('WCard item:', item)
  console.log('Product data:', item.productId)
  console.log('Image URL:', item.productId?.image)

  const handleClick = () => {
    navigate(`/product/${item.productId._id}`)
  }

  const handleRemove = (e) => {
    e.stopPropagation()
    onRemove(item.productId._id)
  }

  return (
    <div
      className='relative w-full rounded-lg overflow-hidden shadow-md transition-transform duration-200 hover:shadow-lg hover:scale-105 cursor-pointer'
      onClick={handleClick}
    >
      <div className='relative h-0 pb-[110%]'>
        <img
          className='absolute top-0 left-0 w-full h-full object-cover rounded-t-lg'
          src={item.productId?.image}
          alt={item.productId?.name || 'Product image'}
          onError={(e) => {
            console.error('Image failed to load:', e.target.src)
            e.target.onerror = null
            e.target.src = 'https://via.placeholder.com/250x275?text=No+Image'
          }}
        />
        <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-3 py-3'>
          <h3 className='text-xs sm:text-sm text-white font-semibold truncate'>
            {item.productId?.name}
          </h3>
          <p className='text-xs sm:text-sm text-white font-bold mt-1'>
            Rs. {item.productId?.price}
          </p>
        </div>
        <button
          onClick={handleRemove}
          className='absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow hover:shadow-md'
          title='Remove from Wishlist'
        >
          <X className='w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-red-500' />
        </button>
      </div>
    </div>
  )
}

export default WCard
