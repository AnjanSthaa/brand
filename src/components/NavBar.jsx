import React, { useState } from 'react'
import { Search, User, ShoppingCart, Menu } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className='sticky top-0 z-10 w-full bg-white shadow-md'>
      <div className='container mx-auto relative'>
        <nav className='flex items-center justify-between py-4'>
          <NavLink to='/' className='text-2xl font-bold'>
            Brand<span className='text-primary'>.</span>
          </NavLink>

          <ul className='hidden lg:flex space-x-6'>
            <li>
              <NavLink to='/Men' className='flex items-center'>
                Men
              </NavLink>
            </li>
            <li>
              <NavLink to='/Women'>Women</NavLink>
            </li>
            <li>
              <NavLink to='/About' className='text-primary'>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to='/ContactPage'>Contact</NavLink>
            </li>
          </ul>

          <div className='flex items-center space-x-4'>
            <button className='p-2 hover:bg-gray-100 rounded-full'>
              <Search className='w-5 h-5' />
            </button>
            <NavLink
              to='/Profile'
              className='p-2 hover:bg-gray-100 rounded-full'
            >
              <User className='w-5 h-5' />
            </NavLink>
            <NavLink
              to='/Cart'
              className='relative p-2 hover:bg-gray-100 rounded-full'
            >
              <ShoppingCart className='w-5 h-5' />
              <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-full'>
                2
              </span>
            </NavLink>
            <button
              onClick={toggleMenu}
              className='lg:hidden p-2 hover:bg-gray-100 rounded-full'
            >
              <Menu className='w-5 h-5' />
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div className='lg:hidden mt-2 py-2 bg-white border-t'>
            <ul className='space-y-2'>
              <li>
                <NavLink
                  to='/Men'
                  className='block px-4 py-2 hover:bg-gray-100'
                >
                  Men
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/Women'
                  className='block px-4 py-2 hover:bg-gray-100'
                >
                  Women
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/About'
                  className='block px-4 py-2 hover:bg-gray-100 text-primary'
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/ContactPage'
                  className='block px-4 py-2 hover:bg-gray-100'
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar
