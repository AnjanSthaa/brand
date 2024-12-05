import React, { useState } from 'react'

const SortDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Sort By')

  const toggleDropdown = () => setIsOpen(!isOpen)
  const selectOption = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
  }

  return (
    <div className='relative'>
      <button
        id='dropdown-btn'
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-controls='sort-options'
        aria-label='Sort By'
        className='flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md focus:outline-none'
      >
        <span>{selectedOption}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {isOpen && (
        <div
          id='sort-options'
          role='menu'
          aria-labelledby='dropdown-btn'
          className='absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg'
        >
          <button
            onClick={() => selectOption('Featured')}
            role='menuitem'
            className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none'
          >
            Featured
          </button>
          <button
            onClick={() => selectOption('Newest')}
            role='menuitem'
            className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none'
          >
            Newest
          </button>
          <button
            onClick={() => selectOption('Price: High-Low')}
            role='menuitem'
            className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none'
          >
            Price: High-Low
          </button>
          <button
            onClick={() => selectOption('Price: Low-High')}
            role='menuitem'
            className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none'
          >
            Price: Low-High
          </button>
        </div>
      )}
    </div>
  )
}

export default SortDropdown
