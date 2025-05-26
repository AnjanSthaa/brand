import Carousel from '../components/Carasol'
import HorizontalSlider from '../components/HoriSlider'
import UCard from '../components/UCard'

const Home = () => {
  return (
    <div className='bg-gray-100 pb-10 min-h-screen overflow-x-hidden'>
      <div className='mb-0'>
        <Carousel />
      </div>

      {/* Black Background Section */}
      <div className='bg-black text-white py-16 shadow-[0_4px_12px_rgba(0,0,0,0.5)]'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl md:text-4xl font-bold font-poppins'>
            Trending Now
          </h2>
        </div>
      </div>

      <div className='my-12'>
        <HorizontalSlider />
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex items-center justify-center mb-6 md:mb-8'>
          <div className='h-[1px] w-24 sm:w-32 md:w-64 bg-gray-300'></div>
          <p className='mx-3 sm:mx-4 md:mx-8 text-lg sm:text-xl md:text-3xl font-semibold font-poppins whitespace-nowrap'>
            Recommended Products
          </p>
          <div className='h-[1px] w-24 sm:w-32 md:w-64 bg-gray-300'></div>
        </div>
        <UCard />
      </div>
    </div>
  )
}

export default Home
