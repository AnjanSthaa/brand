import { useState } from 'react'

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState('')

  const toggleSubmenu = (submenu) => {
    setOpenSubmenu(openSubmenu === submenu ? '' : submenu)
  }

  return (
    <nav
      id='sidebar'
      className='bg-white text-gray-800 p-6 w-[300px] fixed top-0 shadow-lg mt-14 pt-10 h-screen hidden lg:block'
    >
      <div className='pt-5'>
        <h5 className='font-poppins text-2xl font-normal mb-7'>Categories</h5>
        <ul className='space-y-5'>
          {/* Men's Shoes Section */}
          <li className='relative'>
            <button
              onClick={() => toggleSubmenu('mensShoes1')}
              className='flex items-center justify-between text-left w-full font-poppins text-sm font-normal'
            >
              Mens Shoes
              <span className='absolute right-0 text-black font-bold'>
                &#9662;
              </span>
            </button>
            <hr className='border-gray-300 my-3' />
            <ul
              className={`pl-4 space-y-2 transition-all duration-700 ease-in-out overflow-hidden ${
                openSubmenu === 'mensShoes1'
                  ? 'max-h-screen opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              {[
                'Casual',
                'Football',
                'Jordan',
                'Lifestyle',
                'Running',
                'Soccer',
                'Sports',
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

          {/* Women's Shoes Section */}
          <li className='relative'>
            <button
              onClick={() => toggleSubmenu('womensShoes')}
              className='flex items-center justify-between text-left w-full -mt-3 font-poppins text-sm font-normal'
            >
              Womens Shoes
              <span className='absolute right-0 text-black font-bold'>
                &#9662;
              </span>
            </button>
            <hr className='border-gray-300 my-3' />
            <ul
              className={`pl-4 space-y-2 transition-all duration-700 ease-in-out overflow-hidden ${
                openSubmenu === 'womensShoes'
                  ? 'max-h-screen opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              {[
                'Casual',
                'Football',
                'Jordan',
                'Lifestyle',
                'Running',
                'Soccer',
                'Sports',
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
              {['Necklace', 'Ring', 'Bag', 'Sacks', 'Lipstick'].map((item) => (
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

          {/* Clothes Section */}
          <li className='relative'>
            <button
              onClick={() => toggleSubmenu('clothes')}
              className='flex items-center justify-between text-left w-full -mt-3 font-poppins text-sm font-normal'
            >
              Clothes
              <span className='absolute right-0 text-black font-bold'>
                &#9662;
              </span>
            </button>
            <hr className='border-gray-300 my-3' />
            <ul
              className={`pl-4 space-y-2 transition-all duration-700 ease-in-out overflow-hidden ${
                openSubmenu === 'clothes'
                  ? 'max-h-screen opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              {['Jeans', 'T-shirt', 'Jacket', 'Shoes', 'Sweater'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href='#'
                      className='text-gray-400 hover:text-white font-poppins text-sm font-normal'
                    >
                      <span className='mr-2 fa fa-chevron-right'></span>
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </li>
        </ul>

        {/* Tag Cloud */}
        <div className='mt-8'>
          <h5 className='font-poppins text-2xl font-normal mb-7'>Tag Cloud</h5>
          <div className='flex flex-wrap gap-2'>
            {[
              'dish',
              'menu',
              'food',
              'sweet',
              'tasty',
              'delicious',
              'desserts',
              'drinks',
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
