import Carousel from '../components/Carasol'
import HorizontalSlider from '../components/HoriSlider'
import UCard from '../components/UCard'

const Home = () => {
  return (
    <div className='bg-gray-100 pb-10 min-h-screen'>
      <div className='mb-0'>
        <Carousel />
      </div>

      {/* Black Background Section */}
      <div className='bg-black text-white py-16 shadow-[0_4px_12px_rgba(0,0,0,0.5)]'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold font-poppins'>
            Trending Now
          </h2>
        </div>
      </div>

      <div className='mb-12 pt-12'>
        <HorizontalSlider />
      </div>

      <div className='cardCont'>
        <div className='Products'>
          <div className='flex items-center justify-center mt-12 mb-6'>
            <div className='h-[1px] w-64 bg-gray-300'></div>
            <p className='mx-8 text-3xl font-semibold font-poppins'>
              Recommended Products
            </p>
            <div className='h-[1px] w-64 bg-gray-300'></div>
          </div>
          <UCard />
        </div>
      </div>
    </div>
  )
}

export default Home
