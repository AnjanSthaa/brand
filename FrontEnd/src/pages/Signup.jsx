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
      formErrors.confirmPassword = 'Passwords do not match' // Add this for confirmPassword
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
    setApiError(null) // Clear previous errors

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

      // On success
      const data = await response.json()
      localStorage.setItem('token', data.token)
      navigate('/login') // Redirect to login page
    } catch (error) {
      console.error('Signup error:', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden xl:min-w-[400px] lg:w-[900px]'>
        <div className='hidden lg:block lg:w-1/2 h-[600px]'>
          <img
            src='https://wallpaperswide.com/download/jisoo_kpop_star_singer_blackpink-wallpaper-600x800.jpg'
            alt='Signup'
            className='object-cover h-full w-full'
          />
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
                  className='block text-sm font-medium'
                >
                  First Name
                </label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
                  placeholder='First Name'
                  aria-label='First Name'
                  required
                />
              </div>
              <div className='flex-1'>
                <label htmlFor='lastName' className='block text-sm font-medium'>
                  Last Name
                </label>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
                  placeholder='Last Name'
                  aria-label='Last Name'
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium'>
                Email Address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
                placeholder='Email Address'
                aria-label='Email Address'
                required
              />
              {errors.email && (
                <p className='text-red-500 text-xs'>{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={passwordVisibility.password ? 'text' : 'password'}
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
                  placeholder='Password'
                  aria-label='Password'
                  required
                />
                <button
                  type='button'
                  onClick={() => togglePasswordVisibility('password')}
                  className='absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none'
                  aria-label='Toggle password visibility'
                >
                  {passwordVisibility.password ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && (
                <p className='text-red-500 text-xs'>{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium'
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
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
                  placeholder='Confirm Password'
                  aria-label='Confirm Password'
                  required
                />
                <button
                  type='button'
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className='absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none'
                  aria-label='Toggle confirm password visibility'
                >
                  {passwordVisibility.confirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className='text-red-500 text-xs'>{errors.confirmPassword}</p>
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
                <a href='#' className='text-blue-500'>
                  terms and conditions
                </a>
              </label>
            </div>
            {errors.acceptedTerms && (
              <p className='text-red-500 text-xs'>{errors.acceptedTerms}</p>
            )}

            <button
              type='submit'
              className='w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>

            {apiError && (
              <p className='text-red-500 text-xs mt-2'>{apiError}</p>
            )}
          </form>
          <div className='text-sm mt-4'>
            Already have an account?{' '}
            <button onClick={toggleSignin} className='text-blue-500 underline'>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
