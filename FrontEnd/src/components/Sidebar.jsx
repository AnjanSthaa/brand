import { useState } from 'react'

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState('')

  const toggleSubmenu = (submenu) => {
    setOpenSubmenu(openSubmenu === submenu ? '' : submenu)
  }

  return (
    <nav
      id='sidebar'
      className='bg-white text-gray-800 p-6 w-[300px] fixed top-0 shadow-lg mt-14 pt-10 h-screen hidden lg:block overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400'
    >
      <div className='pt-5'>
        <h5 className='font-poppins text-2xl font-normal mb-7'>Categories</h5>
        <ul className='space-y-5'>
          {/* Men's Clothing Section */}
          <li className='relative'>
            <button
              onClick={() => toggleSubmenu('mensClothing')}
              className='flex items-center justify-between text-left w-full font-poppins text-sm font-normal'
            >
              Men's Clothing
              <span className='absolute right-0 text-black font-bold'>
                &#9662;
              </span>
            </button>
            <hr className='border-gray-300 my-3' />
            <ul
              className={`pl-4 space-y-2 transition-all duration-700 ease-in-out overflow-hidden ${
                openSubmenu === 'mensClothing'
                  ? 'max-h-screen opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              {[
                'T-Shirts',
                'Shirts',
                'Jeans',
                'Pants',
                'Jackets',
                'Sweaters',
                'Hoodies',
                'Suits',
                'Activewear',
              ].map((item) => (
                <li key={item}>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-white font-poppins text-sm font-normal'
                  >
                    <span className='mr-2 fa fa-chevron-right'></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          {/* Women's Clothing Section */}
          <li className='relative'>
            <button
              onClick={() => toggleSubmenu('womensClothing')}
              className='flex items-center justify-between text-left w-full -mt-3 font-poppins text-sm font-normal'
            >
              Women's Clothing
              <span className='absolute right-0 text-black font-bold'>
                &#9662;
              </span>
            </button>
            <hr className='border-gray-300 my-3' />
            <ul
              className={`pl-4 space-y-2 transition-all duration-700 ease-in-out overflow-hidden ${
                openSubmenu === 'womensClothing'
                  ? 'max-h-screen opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              {[
                'Dresses',
                'Tops',
                'Blouses',
                'Jeans',
                'Pants',
                'Skirts',
                'Jackets',
                'Sweaters',
                'Activewear',
              ].map((item) => (
                <li key={item}>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-white font-poppins text-sm font-normal'
                  >
                    <span className='mr-2 fa fa-chevron-right'></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          {/* Footwear Section */}
          <li className='relative'>
            <button
              onClick={() => toggleSubmenu('footwear')}
              className='flex items-center justify-between text-left w-full -mt-3 font-poppins text-sm font-normal'
            >
              Footwear
              <span className='absolute right-0 text-black font-bold'>
                &#9662;
              </span>
            </button>
            <hr className='border-gray-300 my-3' />
            <ul
              className={`pl-4 space-y-2 transition-all duration-700 ease-in-out overflow-hidden ${
                openSubmenu === 'footwear'
                  ? 'max-h-screen opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              {[
                'Sneakers',
                'Boots',
                'Sandals',
                'Heels',
                'Flats',
                'Athletic Shoes',
                'Formal Shoes',
              ].map((item) => (
                <li key={item}>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-white font-poppins text-sm font-normal'
                  >
                    <span className='mr-2 fa fa-chevron-right'></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          {/* Accessories Section */}
          <li className='relative'>
            <button
              onClick={() => toggleSubmenu('accessories')}
              className='flex items-center justify-between text-left w-full -mt-3 font-poppins text-sm font-normal'
            >
              Accessories
              <span className='absolute right-0 text-black font-bold'>
                &#9662;
              </span>
            </button>
            <hr className='border-gray-300 my-3' />
            <ul
              className={`pl-4 space-y-2 transition-all duration-700 ease-in-out overflow-hidden ${
                openSubmenu === 'accessories'
                  ? 'max-h-screen opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              {[
                'Bags',
                'Jewelry',
                'Belts',
                'Scarves',
                'Sunglasses',
                'Watches',
                'Hats',
                'Socks',
              ].map((item) => (
                <li key={item}>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-white font-poppins text-sm font-normal'
                  >
                    <span className='mr-2 fa fa-chevron-right'></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        {/* Tag Cloud */}
        <div className='mt-8'>
          <h5 className='font-poppins text-2xl font-normal mb-7'>Tag Cloud</h5>
          <div className='flex flex-wrap gap-2'>
            {[
              'New Arrivals',
              'Sale',
              'Trending',
              'Casual',
              'Formal',
              'Summer',
              'Winter',
              'Limited Edition',
              'Sustainable',
              'Vintage',
              'Designer',
            ].map((tag) => (
              <a
                key={tag}
                href='#'
                className='bg-gray-700 text-white text-sm px-2 py-1 rounded-lg hover:bg-gray-600'
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar
