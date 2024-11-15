
const AddProduct = () => {
  return (
    <div className=" m-0 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
            {/* Product Image Placeholder */}
            <div className="w-32 h-32 bg-gray-200 rounded-lg md:w-48 md:h-48 flex-shrink-0">
              {/* Image or Placeholder */}
            </div>
  
            {/* Product Form */}
            <div className="flex flex-col w-full space-y-4">
              {/* Name and Description fields in 2/3 width */}
              <div className="flex space-x-4">
                <div className="w-2/3">
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    className=" block text-sm font-medium w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product name"
                  />
                </div>
  
                {/* Product Price field with currency notation */}
                <div className="w-1/3 sm">
                  <label className="block text-sm font-medium text-gray-700">Product Price</label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <span className="px-2 text-gray-700">Rs.</span>
                    <input
                      type="number"
                      className="block text-sm font-medium w-full p-3 pl-1 border-0 focus:ring-0 focus:border-0 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Price"
                    />
                  </div>
                </div>
              </div>
  
              {/* Product Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Description</label>
                <textarea
                  className="mt-1 block text-sm font-medium w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product description"
                ></textarea>
              </div>
  
              {/* Add Product Button */}
              <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AddProduct;
