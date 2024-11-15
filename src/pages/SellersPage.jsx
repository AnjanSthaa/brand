import SCard from '../components/SCard'
import AddProduct from './AddProduct'

const SellersPage = () => {
  return (
    <div className='bg-gray-100 min-h-screen font-sans'>
      {/* Profile and AddProduct sections */}
      <div className='m-4 p-6 max-w-screen-lg flex flex-col custom-880:flex-row custom-880:space-x-8 items-center justify-center mx-auto bg-white rounded-lg shadow-lg'>
        {/* Profile Section */}
        <div className='w-full custom-880:w-1/3 m-3 flex flex-col items-center text-center custom-880:text-left'>
          <div className='w-32 h-32 md:w-48 md:h-48 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg'>
            <span className='text-white text-3xl font-semibold'>Ph</span>{' '}
            {/* Placeholder text */}
          </div>
          <div className='mt-6'>
            <h2 className='text-3xl font-bold text-gray-800'>John Doe</h2>
            <p className='text-gray-600'>johndoe@example.com</p>
            <p className='text-gray-500'>+1 (555) 123-4567</p>
          </div>
        </div>

        {/* AddProduct Section */}
        <div className='flex-1 w-full custom-880:w-auto mt-6 custom-880:mt-0'>
          <AddProduct />
        </div>
      </div>

      {/* Cards Section */}
      <div className='w-full mt-8 px-4 max-w-screen mx-auto'>
        <h2 className='text-2xl font-bold m-4 text-gray-800'>
          Product Collection
        </h2>

        {/* SCard component */}
        <SCard />
      </div>
    </div>
  )
}

export default SellersPage
