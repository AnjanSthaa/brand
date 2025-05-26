import SCard from '../components/SCard'
import { useProductStore } from '../store/product'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SellersPage = () => {
  const { fetchProducts, products } = useProductStore()
  const navigate = useNavigate()

  // Fetch User Data
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    fetchProducts()
  }, [fetchProducts, navigate])

  return (
    <div className='pt-2 min-h-screen font-poppins'>
      {/* Cards Section */}
      <div className='w-full mt-2 px-2 sm:px-4 max-w-screen mx-auto'>
        {/* SCard component wrapped in a grid container */}
        <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-4 md:gap-6 mb-2'>
          {products && products.length > 0 ? (
            products.map((product) => (
              <SCard key={product._id} product={product} />
            ))
          ) : (
            <p className='text-sm sm:text-base text-gray-600 w-full text-center col-span-full'>
              No products available
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SellersPage
