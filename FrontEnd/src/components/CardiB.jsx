import ProductDes from '../dataFile/ProductDes.json'
import { useNavigate } from 'react-router-dom'

const CardiB = () => {
  const navigate = useNavigate()

  const handleCardClick = (id) => {
    navigate(`/product/${id}`)
  }

  return (
    <div className='mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 -mt-10'>
      <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {ProductDes.map((card) => (
          <div
            key={card.id}
            className='group relative hover:shadow-lg transition-shadow cursor-pointer'
            onClick={() => handleCardClick(card.id)} // Add click event to the entire div for better usability
          >
            <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80'>
              <img
                alt={card.name}
                src={card.images}
                className='h-full w-full object-cover object-center lg:h-full lg:w-full'
              />
            </div>
            <div className='mt-4 flex justify-between'>
              <div>
                <h3 className='text-sm text-gray-700'>{card.name}</h3>
                <p className='mt-1 text-sm text-gray-500'>{card.stockStatus}</p>
              </div>
              <p className='text-sm font-medium text-gray-900'>
                Rs. {card.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardiB
