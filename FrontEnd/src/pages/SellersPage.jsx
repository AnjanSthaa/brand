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
    <div className='pt-6 min-h-screen font-poppins'>
      {/* Cards Section */}
      <div className='w-full mt-8 px-4 max-w-screen mx-auto'>
        {/* SCard component wrapped in a flex container */}
        <div className='flex flex-wrap gap-6 mb-6'>
          {products && products.length > 0 ? (
            products.map((product) => (
              <SCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SellersPage
