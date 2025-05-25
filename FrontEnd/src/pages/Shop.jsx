import Sidebar from '../components/Sidebar'
import Shopheader from '../components/Shopheader'
import UCard from '../components/UCard'

const Shop = () => {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <div className='hidden 2xl:block w-[300px] flex-shrink-0'>
        <Sidebar />
      </div>
      <div className='flex-1 w-full'>
        <Shopheader />
        <div className='pb-20'>
          <UCard />
        </div>
      </div>
    </div>
  )
}

export default Shop
