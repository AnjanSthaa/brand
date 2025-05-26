import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  })

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState(null)

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const toggleSignin = () => {
    navigate('/login')
  }

  const validateForm = () => {
    let formErrors = {}

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      formErrors.password = 'Passwords do not match'
      formErrors.confirmPassword = 'Passwords do not match'
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Invalid email format'
    }

    // Validate password strength
    if (formData.password.length < 8) {
      formErrors.password = 'Password must be at least 8 characters long'
    }

    if (!formData.acceptedTerms) {
      formErrors.acceptedTerms = 'You must accept the terms and conditions'
    }

    setErrors(formErrors)
    return Object.keys(formErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setApiError(null)

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setApiError(errorData.message || 'Failed to sign up')
        throw new Error(errorData.message || 'Failed to sign up')
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)
      navigate('/login')
    } catch (error) {
      console.error('Signup error:', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4 font-poppins'>
      <div className='flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden xl:min-w-[400px] lg:w-[900px]'>
        <div className='hidden lg:block lg:w-1/2 h-[600px] relative'>
          <img
            src='https://wallpaperswide.com/download/jisoo_kpop_star_singer_blackpink-wallpaper-600x800.jpg'
            alt='Signup'
            className='object-cover h-full w-full'
          />
          <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
            <div className='text-white text-center p-8'>
              <h1 className='text-4xl font-bold mb-4'>Get Started</h1>
              <p className='text-lg'>
                Create an account and start your fashion journey
              </p>
            </div>
          </div>
        </div>
        <div className='w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center'>
          <h2 className='text-2xl font-bold text-center mb-6'>
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='flex space-x-4'>
              <div className='flex-1'>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium mb-2'
                >
                  First Name
                </label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  className='w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors font-poppins'
                  placeholder='First Name'
                  required
                />
              </div>
              <div className='flex-1'>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium mb-2'
                >
                  Last Name
                </label>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  className='w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors font-poppins'
                  placeholder='Last Name'
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium mb-2'>
                Email Address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors font-poppins'
                placeholder='Email Address'
                required
              />
              {errors.email && (
                <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium mb-2'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  type={passwordVisibility.password ? 'text' : 'password'}
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors font-poppins'
                  placeholder='Password'
                  required
                />
                <button
                  type='button'
                  onClick={() => togglePasswordVisibility('password')}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-black transition-colors'
                >
                  {passwordVisibility.password ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && (
                <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium mb-2'
              >
                Confirm Password
              </label>
              <div className='relative'>
                <input
                  type={
                    passwordVisibility.confirmPassword ? 'text' : 'password'
                  }
                  id='confirmPassword'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className='w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors font-poppins'
                  placeholder='Confirm Password'
                  required
                />
                <button
                  type='button'
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-black transition-colors'
                >
                  {passwordVisibility.confirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className='flex items-center'>
              <input
                type='checkbox'
                id='acceptedTerms'
                name='acceptedTerms'
                checked={formData.acceptedTerms}
                onChange={handleChange}
                className='mr-2'
              />
              <label htmlFor='acceptedTerms' className='text-sm'>
                I agree to the{' '}
                <a href='#' className='text-black hover:text-gray-700'>
                  terms and conditions
                </a>
              </label>
            </div>
            {errors.acceptedTerms && (
              <p className='text-red-500 text-xs mt-1'>
                {errors.acceptedTerms}
              </p>
            )}

            <button
              type='submit'
              className='w-full bg-black text-white border-2 border-black py-2 rounded-lg hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
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
                  Signing up...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>

            {apiError && (
              <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm'>
                {apiError}
              </div>
            )}
          </form>
          <div className='text-sm mt-4 text-center'>
            Already have an account?{' '}
            <button
              onClick={toggleSignin}
              className='text-black hover:text-gray-700 underline transition-colors'
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
