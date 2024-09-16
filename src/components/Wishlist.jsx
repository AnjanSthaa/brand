import React from 'react'
import wishitems from '../dataFile/wishitems.json'
import { FaTimes } from 'react-icons/fa'

const Wishlist = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='text-2xl font-bold mb-6'>My Wishlist</h2>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='border-b'>
            <th className='text-left py-2'>Preview</th>
            <th className='text-left py-2'>Product Name</th>
            <th className='text-left py-2'>Unit Price</th>
            <th className='text-left py-2'>Stock Status</th>
            <th className='text-left py-2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {wishitems.map((item, index) => (
            <tr key={index} className='border-b'>
              <td className='py-4'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-16 h-20 object-cover'
                />
              </td>
              <td className='py-4'>{item.name}</td>
              <td className='py-4 text-gray-500'>{item.price}</td>
              <td className='py-4 text-gray-500'>{item.stockStatus}</td>
              <td className='py-4'>
                <div className='flex items-center space-x-2'>
                  <button className='bg-gray-900 text-white px-4 py-2 rounded hover:bg-white hover:text-black font-semibold border border-black transition duration-300'>
                    Add to Cart
                  </button>
                  <div className='relative group'>
                    <FaTimes className='text-gray-500 cursor-pointer hover:text-gray-700' />
                    <span className='absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -right-24 bottom-1 mb-1'>
                      Remove item
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Wishlist
