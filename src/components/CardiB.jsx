import wishitems from '../dataFile/wishItems.json'

const CardiB = () => {
  return (
    <div className='mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 -mt-10'>
      <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {wishitems.map((card) => (
          <div key={card.id} className='group relative'>
            <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80'>
              <img
                alt={card.name}
                src={card.image}
                className='h-full w-full object-cover object-center lg:h-full lg:w-full'
              />
            </div>
            <div className='mt-4 flex justify-between'>
              <div>
                <h3 className='text-sm text-gray-700'>
                  <a href='#'>
                    <span aria-hidden='true' className='absolute inset-0' />
                    {card.name}
                  </a>
                </h3>
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
