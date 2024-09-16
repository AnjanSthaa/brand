import NavBar from '../components/NavBar'
import { FaHeart, FaEdit } from 'react-icons/fa'
import Wishlist from '../components/Wishlist'
import { useState } from 'react'

const Profile = () => {
  const [wishlist, setWishlist] = useState(false)
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <div className='flex-grow overflow-auto'>
        <div className='container mx-auto px-4 py-8'>
          <div className='flex flex-col items-center'>
            <div className='w-48 h-48 rounded-full overflow-hidden shadow-lg mb-6'>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg/330px-Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg'
                alt='Profile'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='text-center mb-6'>
              <h2 className='text-2xl font-bold'>John Doe</h2>
              <p className='text-gray-500'>johndoe@example.com</p>
              <p className='text-gray-400'>+1 (555) 123-4567</p>
            </div>
            <div className='flex space-x-4'>
              <button
                className='bg-black text-white px-4 py-2 rounded-full hover:bg-white hover:text-black font-semibold border border-black transition duration-300 flex items-center'
                onClick={() => setWishlist(!wishlist)}
              >
                <FaHeart className='mr-2' />
                Wishlist
              </button>
              <button className='bg-black text-white px-4 py-2 rounded-full hover:bg-white hover:text-black font-semibold border border-black transition duration-300 flex items-center'>
                <FaEdit className='mr-2' />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        {wishlist && <Wishlist />}
      </div>
    </div>
  )
}

export default Profile
