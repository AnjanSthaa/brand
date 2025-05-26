import { useEffect, useState } from 'react'
import { LogOut, Store, PlusSquare, Grid } from 'lucide-react'
import Wishlist from '../components/Wishlist'
import { useNavigate } from 'react-router-dom'
import SellersPageContent from './SellersPage'
import useAuthStore from '../store/auth'
import AddProduct from '../components/AddProduct'

const Profile = () => {
  const navigate = useNavigate()
  const { user, setUser, clearUser } = useAuthStore()
  const [activeTab, setActiveTab] = useState(
    user?.role === 'seller' ? 'collection' : 'wishlist'
  )

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Error fetching user data')
        }

        const data = await response.json()
        if (data.success) {
          setUser(data.user)
        } else {
          throw new Error(data.message || 'Failed to load user data')
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        navigate('/login')
      }
    }

    fetchUserData()
  }, [navigate, setUser])

  const handleLogout = () => {
    localStorage.removeItem('token')
    clearUser()
    navigate('/login')
  }

  const handleRoleChange = async (newRole) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/auth/role', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      })
      const data = await response.json()
      if (data.success) {
        setUser(data.user)
      }
    } catch (error) {
      console.error('Failed to change role:', error)
    }
  }

  if (!user) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    )
  }

  return (
    <div className='flex flex-col min-h-screen bg-gray-50 font-poppins overflow-x-hidden'>
      <div className='container mx-auto px-4 py-4 sm:py-6 md:py-10 flex flex-col items-center justify-center'>
        {/* Profile Picture */}
        <div className='flex flex-col items-center'>
          <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg mb-2 sm:mb-3 md:mb-4'>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg/330px-Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg'
              alt='Profile'
              className='w-full h-full object-cover'
            />
          </div>
          <h2 className='text-lg sm:text-xl md:text-3xl font-bold mb-1 md:mb-2'>
            {user.name}
          </h2>
          <div className='text-gray-600 text-xs sm:text-sm md:text-lg mb-2 sm:mb-3 md:mb-4'>
            {user.email}
          </div>
          <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4'>
            {user.role === 'seller' ? (
              <button
                onClick={() => handleRoleChange('buyer')}
                className='bg-black hover:bg-white hover:text-black text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg shadow flex items-center justify-center space-x-2 focus:ring-2 focus:ring-gray-300 transition border border-black text-xs sm:text-sm md:text-base'
              >
                <Store className='w-4 h-4 md:w-5 md:h-5' />
                <span>Become a Buyer</span>
              </button>
            ) : (
              <button
                onClick={() => handleRoleChange('seller')}
                className='bg-black hover:bg-white hover:text-black text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg shadow flex items-center justify-center space-x-2 focus:ring-2 focus:ring-gray-300 transition border border-black text-xs sm:text-sm md:text-base'
              >
                <Store className='w-4 h-4 md:w-5 md:h-5' />
                <span>Become a Seller</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              className='bg-red-600 hover:bg-white hover:text-red-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg shadow flex items-center justify-center space-x-2 focus:ring-2 focus:ring-red-300 transition border border-red-600 text-xs sm:text-sm md:text-base'
            >
              <LogOut className='w-4 h-4 md:w-5 md:h-5' />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigator Bar for Sellers and Buyers */}
      {user.role === 'seller' && (
        <div className='container mx-auto px-4'>
          <div className='flex justify-center border-b border-gray-300 mb-4 sm:mb-6 md:mb-8'>
            <button
              className={`flex items-center px-2 sm:px-3 py-2 md:px-6 md:py-3 text-sm sm:text-base md:text-lg font-semibold border-b-2 transition-colors duration-200 ${
                activeTab === 'add'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
              onClick={() => setActiveTab('add')}
            >
              <PlusSquare className='w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2' /> Add
              New Product
            </button>
            <button
              className={`flex items-center px-2 sm:px-3 py-2 md:px-6 md:py-3 text-sm sm:text-base md:text-lg font-semibold border-b-2 transition-colors duration-200 ${
                activeTab === 'collection'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
              onClick={() => setActiveTab('collection')}
            >
              <Grid className='w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2' /> Product
              Collection
            </button>
          </div>
        </div>
      )}
      {user.role === 'buyer' && (
        <div className='container mx-auto px-4'>
          <div className='flex justify-center border-b border-gray-300 mb-4 sm:mb-6 md:mb-8'>
            <button
              className={`flex items-center px-2 sm:px-3 py-2 md:px-6 md:py-3 text-sm sm:text-base md:text-lg font-semibold border-b-2 transition-colors duration-200 ${
                activeTab === 'wishlist'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
              onClick={() => setActiveTab('wishlist')}
            >
              <Grid className='w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2' /> My
              Wishlist
            </button>
            <button
              className={`flex items-center px-2 sm:px-3 py-2 md:px-6 md:py-3 text-sm sm:text-base md:text-lg font-semibold border-b-2 transition-colors duration-200 ${
                activeTab === 'purchased'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
              onClick={() => setActiveTab('purchased')}
            >
              <PlusSquare className='w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2' />{' '}
              Purchased
            </button>
          </div>
        </div>
      )}

      {/* Main Content Section */}
      <div className='container mx-auto px-4 py-3 sm:py-4 md:py-6'>
        {user.role === 'seller' ? (
          activeTab === 'add' ? (
            <div className='flex justify-center'>
              <div className='bg-white shadow p-3 sm:p-4 md:p-6 rounded-lg w-full max-w-xl'>
                <AddProduct />
              </div>
            </div>
          ) : (
            <SellersPageContent />
          )
        ) : activeTab === 'wishlist' ? (
          <div>
            <Wishlist />
          </div>
        ) : (
          <div className='bg-white shadow p-3 sm:p-4 md:p-6 rounded-lg flex flex-col items-center justify-center min-h-[200px]'>
            <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4'>
              Purchased
            </h2>
            <p className='text-xs sm:text-sm md:text-base text-gray-600'>
              You have not purchased any items yet.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
