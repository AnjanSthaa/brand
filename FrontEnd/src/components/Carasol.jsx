import { useState, useEffect } from 'react'
import cardData from '../dataFile/cardData.json'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        nextSlide()
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [isHovered])

  // Preload images
  useEffect(() => {
    cardData.forEach((card) => {
      const img = new Image()
      img.src = card.Image
    })
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cardData.length - 1 : prevIndex - 1
    )
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div
      className='relative w-full h-[500px] overflow-hidden sm:mt-0'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className='absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110'
        aria-label='Previous slide'
      >
        <ChevronLeft className='w-6 h-6' />
      </button>
      <button
        onClick={nextSlide}
        className='absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110'
        aria-label='Next slide'
      >
        <ChevronRight className='w-6 h-6' />
      </button>

      {/* Slides */}
      {cardData.map((card, index) => (
        <div
          key={card.id}
          className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out transform ${
            index === currentIndex
              ? 'opacity-100 translate-x-0 z-10'
              : index < currentIndex
              ? 'opacity-0 -translate-x-full z-0'
              : 'opacity-0 translate-x-full z-0'
          }`}
        >
          <div className='w-full h-full overflow-hidden'>
            <img
              src={card.Image}
              alt={card.Name}
              className='w-full h-full object-cover transform transition-transform duration-700 hover:scale-105'
              loading='eager'
              decoding='async'
              style={{
                imageRendering: 'high-quality',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
              }}
            />
          </div>
          <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8'>
            <div className='max-w-3xl mx-auto'>
              <h2 className='text-3xl font-bold text-white mb-2 font-poppins'>
                {card.Name}
              </h2>
              <div className='flex items-center gap-4 text-white/90 font-poppins'>
                <p className='text-xl font-semibold'>${card.Price}</p>
                <div className='flex items-center'>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(card.Rating / 2)
                          ? 'text-yellow-400'
                          : 'text-gray-400'
                      }`}
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                  ))}
                  <span className='ml-2'>{card.Rating}/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Progress Indicators */}
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2'>
        {cardData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
