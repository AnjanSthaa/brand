import React, { useState } from 'react'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showReenterPassword, setShowReenterPassword] = useState(false)

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword)
    } else if (field === 'reenterPassword') {
      setShowReenterPassword(!showReenterPassword)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden xl:min-w-[400px] lg:w-[900px] transition-all duration-300'>
        {/* Right Side - Image */}
        <div className='hidden lg:block lg:w-1/2'>
          <img
            src='https://wallpaperswide.com/download/jisoo_kpop_star_singer_blackpink-wallpaper-600x800.jpg' // Replace with actual image source
            alt='Login Visual'
            className='object-cover h-full w-full'
          />
        </div>

        {/* Left Side - Login Form */}
        <div className='w-full lg:w-1/2 p-6 lg:p-8 max-w-[450px]'>
          <h2 className='text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 lg:mb-6'>
            Sign up
          </h2>

          {/* Form */}
          <form>
            <div className='flex flex-col sm:flex-row mb-4 space-y-4 sm:space-y-0 sm:space-x-4'>
              <div className='w-full sm:w-1/2'>
                <label
                  className='block text-gray-600 text-sm font-medium mb-2'
                  htmlFor='firstName'
                >
                  First Name
                </label>
                <input
                  type='text'
                  id='firstName'
                  className='w-full px-3 py-2 lg:px-4 lg:py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                  placeholder='Your'
                />
              </div>
              <div className='w-full sm:w-1/2'>
                <label
                  className='block text-gray-600 text-sm font-medium mb-2'
                  htmlFor='lastName'
                >
                  Last Name
                </label>
                <input
                  type='text'
                  id='lastName'
                  className='w-full px-3 py-2 lg:px-4 lg:py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                  placeholder='Name'
                />
              </div>
            </div>

            <div className='mb-4 relative'>
              <label
                className='block text-gray-600 text-sm font-medium mb-2'
                htmlFor='email'
              >
                Email address
              </label>
              <div className='relative'>
                <input
                  type='email'
                  id='email'
                  className='w-full pl-10 pr-3 py-2 lg:pl-11 lg:pr-4 lg:py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                  placeholder='you@example.com'
                />
                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                    <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                  </svg>
                </span>
              </div>
            </div>

            <div className='mb-4 relative'>
              <label
                className='block text-gray-600 text-sm font-medium mb-2'
                htmlFor='phone'
              >
                Phone Number
              </label>
              <div className='relative'>
                <input
                  type='tel'
                  id='phone'
                  className='w-full pl-10 pr-3 py-2 lg:pl-11 lg:pr-4 lg:py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                  placeholder='(123) 456-7890'
                />
                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                  </svg>
                </span>
              </div>
            </div>

            <div className='mb-4 relative'>
              <label
                className='block text-gray-600 text-sm font-medium mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  className='w-full pl-10 pr-10 py-2 lg:pl-11 lg:pr-11 lg:py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                  placeholder='••••••••'
                />
                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
                <button
                  type='button'
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                  onClick={() => togglePasswordVisibility('password')}
                >
                  {showPassword ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                      <path
                        fillRule='evenodd'
                        d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z'
                        clipRule='evenodd'
                      />
                      <path d='M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z' />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className='mb-4 lg:mb-6 relative'>
              <label
                className='block text-gray-600 text-sm font-medium mb-2'
                htmlFor='reenterPassword'
              >
                Re-enter Password
              </label>
              <div className='relative'>
                <input
                  type={showReenterPassword ? 'text' : 'password'}
                  id='reenterPassword'
                  className='w-full pl-10 pr-10 py-2 lg:pl-11 lg:pr-11 lg:py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
                  placeholder='••••••••'
                />
                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
                <button
                  type='button'
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                  onClick={() => togglePasswordVisibility('reenterPassword')}
                >
                  {showReenterPassword ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                      <path
                        fillRule='evenodd'
                        d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z'
                        clipRule='evenodd'
                      />
                      <path d='M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z' />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className='mb-4'>
              <label className='inline-flex items-center'>
                <input
                  type='checkbox'
                  className='form-checkbox h-4 w-4 text-blue-600 focus:ring-black-bold cursor-pointer'
                />
                <span className='ml-2 text-gray-600 text-sm'>
                  I agree to brand.'s{' '}
                  <a
                    href='#'
                    className='font-bold hover:underline cursor-pointer'
                  >
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a
                    href='#'
                    className='font-bold hover:underline cursor-pointer'
                  >
                    Terms of use.
                  </a>
                </span>
              </label>
            </div>

            <button
              type='submit'
              className='w-full bg-black text-white px-4 py-2 rounded-full hover:bg-white hover:text-black font-semibold border border-black transition duration-300'
            >
              Sign up
            </button>
          </form>

          <div className='flex items-center justify-between my-4 lg:my-6'>
            <span className='border-b w-1/5 lg:w-1/4'></span>
            <span className='text-xs text-gray-500 uppercase'>
              Or continue with
            </span>
            <span className='border-b w-1/5 lg:w-1/4'></span>
          </div>

          <div className='flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2'>
            <button className='flex items-center justify-center w-full sm:w-1/2 bg-white border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 py-2 px-4'>
              <img
                src='/google-icon.svg'
                alt='Google'
                className='w-5 h-5 mr-2'
              />
              <span className='text-sm'>Google</span>
            </button>
            <button className='flex items-center justify-center w-full sm:w-1/2 bg-white border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 py-2 px-4'>
              <img
                src='/github-icon.svg'
                alt='GitHub'
                className='w-5 h-5 mr-2'
              />
              <span className='text-sm'>GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
