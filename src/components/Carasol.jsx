import { useState } from 'react'
import cardData from '../dataFile/cardData.json'

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length)
  }

  setTimeout(nextSlide, 5000)

  return (
    <div className='relative w-full h-96 overflow-hidden sm:mt-0'>
      {cardData.map((card, index) => (
        <div
          key={card.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className='w-full h-full overflow-hidden'>
            <img
              src={card.Image}
              alt={card.Name}
              className='w-full h-full object-cover md:object-contain'
            />
          </div>
          <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4'>
            <h2 className='text-xl font-bold'>{card.Name}</h2>
            <p>Price: ${card.Price}</p>
            <p>Rating: {card.Rating}/10</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Carousel
