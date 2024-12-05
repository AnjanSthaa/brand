const DeliveryMethod = () => {
    return (
      <div className="p-4 border rounded-md bg-gray-50">
        <fieldset>
          <legend className="text-lg font-medium mb-4 text-gray-700">Delivery method</legend>
          <div className="space-y-4" role="radiogroup">
            <span 
              aria-label="Standard" 
              className="flex justify-between items-center p-4 border rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              role="radio" 
              aria-checked="true" 
              tabIndex="0"
            >
              <span>
                <span className="block font-semibold text-gray-800">Standard</span>
                <span className="block text-sm text-gray-500">4–10 business days</span>
              </span>
              <span className="text-gray-800">$5.00</span>
            </span>
  
            <span 
              aria-label="Express" 
              className="flex justify-between items-center p-4 border rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              role="radio" 
              aria-checked="false" 
              tabIndex="-1"
            >
              <span>
                <span className="block font-semibold text-gray-800">Express</span>
                <span className="block text-sm text-gray-500">2–5 business days</span>
              </span>
              <span className="text-gray-800">$16.00</span>
            </span>
          </div>
        </fieldset>
      </div>
    );
  };
  
  export default DeliveryMethod;
  