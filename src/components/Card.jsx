import cardData from '../dataFile/cardData.json'

const Card = () => {
  return (
    <div className='main-container flex justify-center items-center '>
      <div className='w-3/4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-10'>
        {cardData.map((card) => (
          <div
            key={card.id}
            className='max-w-sm rounded overflow-hidden shadow-lg my-4'
          >
            <div className='relative h-0 pb-[75%]'>
              <img
                className='absolute top-0 left-0 w-full h-full object-cover'
                src={card.Image}
                alt={card.Name}
              />
              <button className='absolute top-0 right-0 m-2'>
                <svg
                  className='w-4 h-4 sm:w-6 sm:h-6 text-gray-500 hover:text-red-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  ></path>
                </svg>
              </button>
            </div>
            <div className='px-4 sm:px-6 py-2 sm:py-4'>
              <div className='font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-2'>
                {card.Name}
              </div>
            </div>
            <div className='px-4 sm:px-6 pt-2 sm:pt-4 pb-1 sm:pb-2'>
              <span className='hidden sm:inline-block bg-gray-200 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-gray-700 mr-2 mb-2'>
                Rating: {card.Rating}/10
              </span>
              <span className='inline-block bg-gray-200 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-gray-700 mr-2 mb-2'>
                ${card.Price}
              </span>
            </div>
            <div className='px-4 sm:px-6 py-2 sm:py-4'>
              <button className='bg-gray-900 hover:bg-white hover:text-black hover:border-black border text-white font-bold text-xs sm:text-sm py-1 sm:py-2 px-2 sm:px-4 rounded w-full transition duration-300'>
                + Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Card
