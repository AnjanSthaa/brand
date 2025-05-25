const About = () => {
  return (
    <div className='min-h-screen bg-gray-50 font-poppins'>
      {/* Hero Section */}
      <div className='bg-black text-white py-20'>
        <div className='container mx-auto px-4'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6'>About Brand</h1>
          <p className='text-gray-300 text-lg max-w-2xl'>
            Your premier destination for fashion and style. We bring together
            the latest trends and timeless classics to help you express your
            unique style.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className='container mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
          <div>
            <h2 className='text-3xl font-bold mb-6'>Our Mission</h2>
            <p className='text-gray-600 mb-6'>
              At Brand, we&apos;re committed to providing high-quality fashion
              products that empower individuals to express their unique style.
              We believe in sustainable practices and ethical manufacturing
              processes.
            </p>
            <p className='text-gray-600'>
              Our goal is to make fashion accessible while maintaining the
              highest standards of quality and customer service.
            </p>
          </div>
          <div className='relative h-[400px] rounded-lg overflow-hidden'>
            <img
              src='https://images.unsplash.com/photo-1441984904996-e0b6ba687e04'
              alt='Our Mission'
              className='absolute inset-0 w-full h-full object-cover'
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className='bg-white py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold mb-12 text-center'>Our Values</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow'>
              <div className='w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold mb-4'>Quality</h3>
              <p className='text-gray-600'>
                We never compromise on quality. Every product meets our rigorous
                standards.
              </p>
            </div>
            <div className='bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow'>
              <div className='w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold mb-4'>Innovation</h3>
              <p className='text-gray-600'>
                We constantly evolve and innovate to bring you the latest
                fashion trends.
              </p>
            </div>
            <div className='bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow'>
              <div className='w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6'>
                <svg
                  className='w-6 h-6 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-semibold mb-4'>Community</h3>
              <p className='text-gray-600'>
                We build and nurture a community of fashion enthusiasts and
                style-conscious individuals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className='container mx-auto px-4 py-16'>
        <h2 className='text-3xl font-bold mb-12 text-center'>Our Team</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='text-center group'>
            <div className='w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow'>
              <img
                src='https://images.unsplash.com/photo-1494790108377-be9c29b29330'
                alt='Team Member'
                className='w-full h-full object-cover'
              />
            </div>
            <h3 className='text-xl font-semibold mb-2'>Sarah Johnson</h3>
            <p className='text-gray-600'>Creative Director</p>
          </div>
          <div className='text-center group'>
            <div className='w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow'>
              <img
                src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
                alt='Team Member'
                className='w-full h-full object-cover'
              />
            </div>
            <h3 className='text-xl font-semibold mb-2'>Michael Chen</h3>
            <p className='text-gray-600'>Head of Design</p>
          </div>
          <div className='text-center group'>
            <div className='w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow'>
              <img
                src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
                alt='Team Member'
                className='w-full h-full object-cover'
              />
            </div>
            <h3 className='text-xl font-semibold mb-2'>Emma Wilson</h3>
            <p className='text-gray-600'>Fashion Consultant</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
