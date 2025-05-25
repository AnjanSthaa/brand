import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import SearchBox from './SearchBox'
import SortDropdown from './SortDropdown'
import Filterer from './Filter'

function Shopheader() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen)
  }

  return (
    <div>
      <nav className='text-black p-4 mt-3 mb-0 pb-6 sm:pb-0 flex items-center justify-between max-w-[1400px] mx-auto'>
        {/* Left section for the Products title */}
        <div className='flex justify-start'>
          <h2 className='text-xl md:text-2xl font-bold tracking-tight text-gray-900 font-poppins'>
            Products
          </h2>
        </div>

        {/* Right section */}
        <div className='flex items-center space-x-4'>
          {/* Search bar and sort options for larger screens */}
          <div className='hidden 2xl:flex items-center space-x-4'>
            <form className='flex items-center'>
              <div className='relative w-full max-w-xs md:max-w-sm border-b border-gray-300 flex'>
                <label htmlFor='search-input' className='sr-only'>
                  Search:
                </label>
                <input
                  type='text'
                  placeholder='Search...'
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className='w-full py-2 px-2 placeholder-gray-500 focus:outline-none'
                  name='searchString'
                />
                <button
                  type='submit'
                  className='flex items-center justify-center px-2'
                >
                  <Search className='w-5 h-5' />
                </button>
              </div>
              <input type='hidden' name='search-cat' value='header-search' />
            </form>
            <SortDropdown />
          </div>

          {/* Icons for small screens */}
          <div className='flex 2xl:hidden space-x-4'>
            <button onClick={toggleSearch} className='p-2'>
              <Search className='w-5 h-5' />
            </button>
            <button onClick={toggleOffcanvas} className='p-2'>
              <Filter className='w-5 h-5' />
            </button>
          </div>
        </div>

        {/* Off-canvas menu for small screens */}
        {isOffcanvasOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
            <div className='bg-white w-full h-full p-6'>
              <button onClick={toggleOffcanvas} className='text-black text-2xl'>
                &times;
              </button>
              <div className='mt-4'>
                <div>
                  <SortDropdown />
                  <Filterer />
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      {searchOpen && <SearchBox toggleSearch={toggleSearch} />}
    </div>
  )
}

export default Shopheader
