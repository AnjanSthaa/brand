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
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4 font-poppins'>
      <div className='flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden xl:min-w-[400px] lg:w-[900px]'>
        <div className='hidden lg:block lg:w-1/2 h-[540px] flex items-center justify-center overflow-hidden relative'>
          <img
            src='https://i.pinimg.com/736x/24/08/d1/2408d182a129ecb1fd9ae190c556ce34.jpg'
            alt='Login'
            className='object-cover h-full w-full object-center'
          />
          <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
            <div className='text-white text-center p-8'>
              <h1 className='text-4xl font-bold mb-4'>Welcome Back</h1>
              <p className='text-lg'>
                Sign in to continue your fashion journey
              </p>
            </div>
          </div>
        </div>
        <div className='w-full lg:w-1/2 p-6 lg:p-8'>
          <div className='text-center mb-8'>
            <h2 className='text-2xl lg:text-3xl font-semibold mb-2'>
              Sign in to your account
            </h2>
          </div>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-2' htmlFor='email'>
                Email address
              </label>
              <div className='relative'>
                <input
                  type='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-gray-100 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-black transition-colors font-poppins`}
                  placeholder='Enter your email'
                />
                <svg
                  className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                  />
                </svg>
              </div>
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
                  } rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-black transition-colors font-poppins`}
                  placeholder='Enter your password'
                />
                <svg
                  className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                  />
                </svg>
                <button
                  type='button'
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-black transition-colors'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && (
                <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
              )}
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='remember'
                  className='h-4 w-4 text-black focus:ring-black border-gray-300 rounded'
                />
                <label
                  htmlFor='remember'
                  className='ml-2 block text-sm text-gray-600'
                >
                  Remember me
                </label>
              </div>
              <a href='#' className='text-sm text-black hover:text-gray-700'>
                Forgot password?
              </a>
            </div>
            {apiError && (
              <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm'>
                {apiError}
              </div>
            )}
            <button
              type='submit'
              className='w-full bg-black text-white border-2 border-black px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
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
          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300'></div>
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white text-gray-500'>
                  Or continue with
                </span>
              </div>
            </div>
            <div className='mt-6 grid grid-cols-2 gap-3'>
              <button
                type='button'
                className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84' />
                </svg>
              </button>
              <button
                type='button'
                className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className='text-sm mt-6 text-center'>
            Don&apos;t have an account?{' '}
            <button
              onClick={toggleSignup}
              className='text-black hover:text-gray-700 underline transition-colors'
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
