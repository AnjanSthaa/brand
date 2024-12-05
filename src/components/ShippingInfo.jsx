const ShippingInfo = () => {
  return (
    <div className="p-8 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Shipping Information</h2>
      
      <div className="space-y-6">
        {/* Full Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
            <input 
              id="first-name" 
              name="first-name" 
              type="text" 
              autoComplete="given-name" 
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input 
              id="last-name" 
              name="last-name" 
              type="text" 
              autoComplete="family-name" 
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Address Field */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Street Address</label>
          <input 
            id="address" 
            name="address" 
            type="text" 
            autoComplete="street-address" 
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* City, State, and Postal Code in One Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input 
              id="city" 
              name="city" 
              type="text" 
              autoComplete="address-level2" 
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700">State / Province</label>
            <input 
              id="region" 
              name="region" 
              type="text" 
              autoComplete="address-level1" 
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">Postal Code</label>
            <input 
              id="postal-code" 
              name="postal-code" 
              type="text" 
              autoComplete="postal-code" 
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Country Field */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
          <select 
            id="country" 
            name="country" 
            autoComplete="country-name" 
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a Country</option>
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
            {/* Add more countries as needed */}
          </select>
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input 
            id="phone" 
            name="phone" 
            type="tel" 
            autoComplete="tel" 
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
