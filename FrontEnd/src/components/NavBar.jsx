import { useState, useEffect } from 'react'
import { User, Menu, MailIcon } from 'lucide-react'
import Cart from './Cart'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import SearchBox from './SearchBox'
import { ShoppingCart } from 'lucide-react'
import useAuthStore from '../store/auth'

const NavBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, setUser } = useAuthStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [highlightCart, setHighlightCart] = useState(false)

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    if (searchParams.get('highlight') === 'cart') {
      setHighlightCart(true)
      // Remove the highlight parameter from URL
      navigate(location.pathname, { replace: true })
      // Reset highlight after animation
      setTimeout(() => setHighlightCart(false), 2000)
    }
  }, [location, navigate])

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch('/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [setUser])

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const openCart = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    } else {
      setIsCartOpen(true)
    }
  }

  const closeCart = () => {
    setIsCartOpen(false)
  }

  const GotoTop = () => {
    window.scrollTo(0, 0)
  }

  if (isLoading) {
    return (
      <div className='sticky top-0 z-50 w-full bg-white shadow-md'>
        <div className='container mx-auto relative'>
          <nav className='flex items-center justify-between py-4 pr-4'>
            <div className='animate-pulse bg-gray-200 h-8 w-32 rounded'></div>
          </nav>
        </div>
      </div>
    )
  }

  return (
    <div className='sticky top-0 z-50 w-full bg-white shadow-md'>
      <div className='container mx-auto relative'>
        <nav className='flex items-center justify-between py-4 pr-4 font-poppins'>
          <NavLink to='/' className='text-2xl font-bold pl-10 font-poppins'>
            Brand<span className='text-primary'>.</span>
          </NavLink>

          <ul className='hidden lg:flex space-x-6'>
            <li>
              <NavLink
                to='/shop'
                className='flex items-center hover:text-primary transition-colors'
                onClick={GotoTop}
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/About'
                className='text-primary hover:text-primary/80 transition-colors'
                onClick={GotoTop}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/ContactPage'
                className='hover:text-primary transition-colors'
                onClick={GotoTop}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <div className='flex items-center space-x-4'>
            <NavLink
              to={user ? '/profile' : '/login'}
              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
              aria-label='Go to profile'
            >
              <User className='w-5 h-5' />
            </NavLink>

            {user && (
              <NavLink
                to='/message'
                className='relative p-2 hover:bg-gray-100 rounded-full transition-colors'
                aria-label='Go to messages'
              >
                <MailIcon className='w-5 h-5' />
              </NavLink>
            )}

            {user && user.role === 'buyer' && (
              <button
                onClick={openCart}
                className={`relative p-2 hover:bg-gray-100 rounded-full transition-all duration-500 ${
                  highlightCart ? 'animate-bounce bg-black text-white' : ''
                }`}
                aria-label='Open cart'
              >
                <ShoppingCart className='w-5 h-5' />
              </button>
            )}

            <button
              onClick={toggleMenu}
              className='lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors'
              aria-label='Toggle menu'
            >
              <Menu className='w-5 h-5' />
            </button>
          </div>
        </nav>

        {searchOpen && <SearchBox toggleSearch={toggleSearch} />}

        {isMenuOpen && (
          <div className='lg:hidden mt-2 py-2 bg-white border-t font-poppins'>
            <ul className='space-y-2'>
              <li>
                <NavLink
                  to='/shop'
                  className='block px-4 py-2 hover:bg-gray-100 transition-colors'
                  onClick={() => {
                    GotoTop()
                    setIsMenuOpen(false)
                  }}
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/About'
                  className='block px-4 py-2 hover:bg-gray-100 transition-colors'
                  onClick={() => {
                    GotoTop()
                    setIsMenuOpen(false)
                  }}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/ContactPage'
                  className='block px-4 py-2 hover:bg-gray-100 transition-colors'
                  onClick={() => {
                    GotoTop()
                    setIsMenuOpen(false)
                  }}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>

      {user?.role === 'buyer' && <Cart open={isCartOpen} onClose={closeCart} />}
    </div>
  )
}

export default NavBar
