const ContactPage = () => {
  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6'>Contact Us</h1>
        <p className='text-gray-600 mb-8'>
          We take our customer support very seriously. Please fill out the form
          below and we will get back to you as soon as possible.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <h2 className='text-xl font-semibold mb-4'>Location</h2>
            <p className='text-gray-600'>
              195 E Parker Square Dr, Parker, CO 801
            </p>
            <p className='text-gray-600'>+43 982 314 0958</p>
          </div>
          <div>
            <h2 className='text-xl font-semibold mb-4'>Map</h2>
            <div className='w-full h-64 rounded-md overflow-hidden'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.0307269439!2d85.42944731506156!3d27.67240798280364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1a34b6f4f1d7%3A0x5c0f0b0f0f0f0f0!2sBhaktapur%20Multiple%20Campus!5e0!3m2!1sen!2snp!4v1623345678901!5m2!1sen!2snp'
                width='100%'
                height='100%'
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
              ></iframe>
            </div>
          </div>
        </div>
        <form className='mt-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <input
              type='text'
              placeholder='Name'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <input
              type='email'
              placeholder='Email'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
          <textarea
            placeholder='Message'
            rows='4'
            className='w-full px-4 py-2 mt-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          ></textarea>
          <button
            type='submit'
            className='mt-6 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500'
          >
            SEND MESSAGE
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactPage
