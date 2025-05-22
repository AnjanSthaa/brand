import { useState, useRef, useEffect } from 'react'
import { Search } from 'lucide-react'

const SearchBox = ({ toggleSearch }) => {
  const [isOpen, setIsOpen] = useState(true)
  const inputRef = useRef(null)

  const closeModal = () => {
    setIsOpen(false)
    toggleSearch()
  }

  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className='fixed inset-0 sm:-mt-12 z-50 flex items-center justify-end bg-gray-900 bg-opacity-50 font-poppins font-normal'
      role='dialog'
      aria-label='Search Form'
      aria-modal='true'
    >
      <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-6 mt-0 mr-4 ml-4'>
        <div className='flex justify-between items-center border-b pb-4'>
          <h2 className='sr-only'>Search</h2>

          <button
            type='button'
            onClick={closeModal}
            className='hover:text-red-900 font-bold'
          >
            <span>Close</span>
          </button>
        </div>

        <form className='mt-3'>
          <div className='mb-4'>
            <label htmlFor='search-input' className='sr-only'>
              Search:
            </label>
            <div className='relative border-b border-gray-300 flex justify-between'>
              <input
                type='text'
                autoComplete='off'
                id='search-input'
                className='w-80 py-2 px-0 placeholder-gray-500 focus:outline-none focus:border-blue-500'
                name='searchString'
                placeholder=' What are you looking for?'
                ref={inputRef}
              />
              <button type='submit'>
                <Search className='w-5 h-5' />
              </button>
            </div>
          </div>
          <input type='hidden' name='search-cat' value='header-search' />
        </form>

        <section className='mt-6'>
          <h3 className='text-sm font-semibold'>Trending Searches</h3>
          <ul className='mt-2 space-y-1'>
            {['handbags', 'shoes', 'belts', 'bags'].map((item) => (
              <li key={item} className='text-blue-600 hover:underline'>
                <a href='#'>{item}</a>
              </li>
            ))}
          </ul>
        </section>

        <section className='mt-6'>
          <h3 className='text-sm font-semibold'>What&apos:s New</h3>
          <ul className='mt-2 space-y-1'>
            <li>
              <a href='#' className='text-blue-600 hover:underline'>
                Women
              </a>
            </li>
            <li>
              <a href='#' className='text-blue-600 hover:underline'>
                Men
              </a>
            </li>
          </ul>
        </section>

        <section className='mt-6'>
          <h3 className='text-sm font-semibold'>Find the perfect gift</h3>
          <ul className='mt-2 space-y-1'>
            <li>
              <a href='#' className='text-blue-600 hover:underline'>
                Gift
              </a>
            </li>
            <li>
              <a href='#' className='text-blue-600 hover:underline'>
                Personalization
              </a>
            </li>
            <li>
              <a href='#' className='text-blue-600 hover:underline'>
                Store locator
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default SearchBox
