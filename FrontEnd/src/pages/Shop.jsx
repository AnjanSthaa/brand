import Sidebar from '../components/Sidebar'
import Shopheader from '../components/Shopheader'
import UCard from '../components/UCard'

const Shop = () => {
  return (
    <div>
      <Sidebar />
      <div className='lg:ml-[320px]'>
        <Shopheader />
        <UCard />
      </div>
    </div>
  )
}

export default Shop
