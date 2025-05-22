import Sidebar from '../components/Sidebar'
import Shopheader from '../components/Shopheader'
import UCard from '../components/UCard'

const Shop = () => {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 w-full 2xl:ml-[300px]'>
        <Shopheader />
        <div className='pb-20'>
          <UCard />
        </div>
      </div>
    </div>
  )
}

export default Shop
