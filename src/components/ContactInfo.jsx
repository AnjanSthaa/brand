const ContactInfo = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Contact information</h2>
        <div className="mb-6">
          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email-address"
              name="email-address"
              type="email"
              autoComplete="email"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default ContactInfo;
  