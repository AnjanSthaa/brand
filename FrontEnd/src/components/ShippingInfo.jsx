const ShippingInfo = ({ formData, onChange }) => {
  return (
    <div className='p-8 border rounded-lg bg-white shadow-sm'>
      <h2 className='text-xl font-semibold mb-6 text-gray-800'>
        Shipping Information
      </h2>

      <div className='space-y-6'>
        {/* Street Address Field */}
        <div>
          <label
            htmlFor='address'
            className='block text-sm font-medium text-gray-700'
          >
            Street Address
          </label>
          <input
            id='address'
            name='address'
            type='text'
            value={formData.address || ''}
            onChange={onChange}
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>

        {/* City, State, and Postal Code */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div>
            <label
              htmlFor='city'
              className='block text-sm font-medium text-gray-700'
            >
              City
            </label>
            <input
              id='city'
              name='city'
              type='text'
              value={formData.city || ''}
              onChange={onChange}
              required
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>

          <div>
            <label
              htmlFor='state'
              className='block text-sm font-medium text-gray-700'
            >
              State / Province
            </label>
            <input
              id='state'
              name='state'
              type='text'
              value={formData.state || ''}
              onChange={onChange}
              required
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>

          <div>
            <label
              htmlFor='postalCode'
              className='block text-sm font-medium text-gray-700'
            >
              Postal Code
            </label>
            <input
              id='postalCode'
              name='postalCode'
              type='text'
              value={formData.postalCode || ''}
              onChange={onChange}
              required
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>
        </div>

        {/* Country Field */}
        <div>
          <label
            htmlFor='country'
            className='block text-sm font-medium text-gray-700'
          >
            Country
          </label>
          <select
            id='country'
            name='country'
            value={formData.country || ''}
            onChange={onChange}
            required
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          >
            <option value=''>Select a Country</option>
            <option value='Nepal'>Nepal</option>
            {/* Add more countries as needed */}
          </select>
        </div>
      </div>
    </div>
  )
}

export default ShippingInfo
