const ContactInfo = ({ formData, onChange }) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-sm'>
      <h2 className='text-2xl font-bold mb-4'>Contact Information</h2>

      <div className='space-y-6'>
        {/* Email Field */}
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email Address
          </label>
          <input
            id='email'
            name='email'
            type='email'
            value={formData.email || ''}
            onChange={onChange}
            autoComplete='email'
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>

        {/* Phone Field */}
        <div>
          <label
            htmlFor='phone'
            className='block text-sm font-medium text-gray-700'
          >
            Phone Number
          </label>
          <input
            id='phone'
            name='phone'
            type='tel'
            value={formData.phone || ''}
            onChange={onChange}
            autoComplete='tel'
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='e.g., +977 98XXXXXXXX'
          />
        </div>

        {/* Optional Newsletter Subscription */}
        <div className='flex items-center'>
          <input
            id='newsletter'
            name='newsletter'
            type='checkbox'
            checked={formData.newsletter || false}
            onChange={onChange}
            className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
          />
          <label
            htmlFor='newsletter'
            className='ml-2 block text-sm text-gray-700'
          >
            Keep me updated with news and exclusive offers
          </label>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo
