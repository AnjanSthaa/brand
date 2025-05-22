import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/auth'

const LoginForm = () => {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleSignup = () => {
    navigate('/signup')
  }

  const validateForm = () => {
    let formErrors = {}
    if (!email) {
      formErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Email is invalid'
    }

    if (!password) {
      formErrors.password = 'Password is required'
    } else if (password.length < 8) {
      formErrors.password = 'Password must be at least 8 characters long'
    }

    setErrors(formErrors)
    return Object.keys(formErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setApiError('')

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to login')
      }

      localStorage.setItem('token', data.token)
      setUser(data.user)
      navigate('/profile')
    } catch (error) {
      setApiError(error.message || 'An error occurred during login')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden xl:min-w-[400px] lg:w-[900px]'>
        <div className='hidden lg:block lg:w-1/2 h-[500px] flex items-center justify-center overflow-hidden'>
          <img
            src='https://i.pinimg.com/736x/24/08/d1/2408d182a129ecb1fd9ae190c556ce34.jpg'
            alt='Login'
            className='object-cover h-full w-full object-center'
          />
        </div>
        <div className='w-full lg:w-1/2 p-6 lg:p-8'>
          <h2 className='text-2xl lg:text-3xl font-semibold mb-4'>
            Sign in to your account
          </h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-2' htmlFor='email'>
                Email address
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-gray-100 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black transition-colors`}
                placeholder='Enter your email'
              />
              {errors.email && (
                <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
              )}
            </div>
            <div>
              <label
                className='block text-sm font-medium mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-gray-100 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-black transition-colors`}
                  placeholder='Enter your password'
                />
                <button
                  type='button'
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-500 hover:text-blue-600 transition-colors'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && (
                <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
              )}
            </div>
            {apiError && (
              <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm'>
                {apiError}
              </div>
            )}
            <button
              type='submit'
              className='w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className='flex items-center justify-center'>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
          <div className='text-sm mt-4 text-center'>
            Don&apos;t have an account?{' '}
            <button
              onClick={toggleSignup}
              className='text-blue-500 hover:text-blue-600 underline transition-colors'
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
