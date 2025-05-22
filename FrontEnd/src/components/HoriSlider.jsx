import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import horiCardData from '../dataFile/horiCardData.json'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const HorizontalSlider = () => {
  const sliderRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const handleMouseDown = (e) => {
    if (!isMobile) return
    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    if (!isMobile) return
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isMobile || !isDragging) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseLeave = () => {
    if (!isMobile) return
    setIsDragging(false)
  }

  const handleScrollLeft = () => {
    sliderRef.current.scrollLeft -= 300
  }

  const handleScrollRight = () => {
    sliderRef.current.scrollLeft += 300
  }

  return (
    <div className='relative w-full px-4 sm:px-6 lg:px-8'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold text-gray-900'>Trending Now</h2>
      </div>

      <div className='relative group'>
        <button
          onClick={handleScrollLeft}
          className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-2 rounded-full bg-white/30 backdrop-blur-md shadow-lg hover:bg-white/40 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 border border-white/20'
        >
          <ChevronLeft className='w-5 h-5 text-gray-800' />
        </button>

        <div
          ref={sliderRef}
          id='slider'
          className={`flex overflow-x-auto ${
            isMobile
              ? 'scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-transparent'
              : 'scrollbar-none'
          } scroll-smooth gap-4 pb-4 snap-x snap-mandatory ${
            isMobile ? 'cursor-grab active:cursor-grabbing' : ''
          }`}
          style={{
            scrollbarWidth: isMobile ? 'thin' : 'none',
            msOverflowStyle: isMobile ? 'auto' : 'none',
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {horiCardData.map((item, index) => (
            <Link
              key={index}
              to={`/category/${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              className='flex-none w-[280px] sm:w-[320px] group'
              onClick={(e) => isDragging && e.preventDefault()}
            >
              <div className='relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-[180px] sm:h-[200px]'>
                <div className='w-full h-full'>
                  <img
                    src={item.image}
                    alt={item.label}
                    className='object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300'
                    draggable={false}
                  />
                </div>
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'>
                  <div className='absolute bottom-0 left-0 right-0 p-4'>
                    <h3 className='text-white text-lg font-semibold line-clamp-2'>
                      {item.label}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button
          onClick={handleScrollRight}
          className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 p-2 rounded-full bg-white/30 backdrop-blur-md shadow-lg hover:bg-white/40 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 border border-white/20'
        >
          <ChevronRight className='w-5 h-5 text-gray-800' />
        </button>
      </div>
    </div>
  )
}

export default HorizontalSlider
