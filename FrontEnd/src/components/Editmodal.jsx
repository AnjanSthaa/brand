const EditProductModal = ({
  isEditDialogOpen,
  closeEditDialog,
  updatedProduct,
  setUpdatedProduct,
  handleUpdateProduct,
  handleAddField,
  handleRemoveField,
}) => {
  const isMinusDisabled = (field) => updatedProduct[field].length <= 1

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isEditDialogOpen ? 'block' : 'hidden'
      }`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div className='bg-white rounded-lg p-6 w-full sm:w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3'>
        <h2 className='text-lg font-bold mb-6 text-center'>Edit Product</h2>
        <div className='space-y-6'>
          {/* Product Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Product Name
            </label>
            <input
              type='text'
              value={updatedProduct.name}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
              }
              className='block w-full p-3 border border-gray-300 rounded-md'
              placeholder='Enter product name'
            />
          </div>

          {/* Product Price */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Product Price
            </label>
            <input
              type='number'
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, price: e.target.value })
              }
              className='block w-full p-3 border border-gray-300 rounded-md'
              placeholder='Enter product price'
            />
          </div>

          {/* Product Image */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Product Image
            </label>
            <input
              type='text'
              value={updatedProduct.image}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, image: e.target.value })
              }
              className='block w-full p-3 border border-gray-300 rounded-md'
              placeholder='Enter image URL'
            />
          </div>

          {/* Product Description */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Product Description
            </label>
            <textarea
              value={updatedProduct.desc}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, desc: e.target.value })
              }
              className='block w-full p-3 border border-gray-300 rounded-md'
              placeholder='Enter product description'
            ></textarea>
          </div>

          {/* Colors Section */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Colors
            </label>
            {updatedProduct.colors.map((color, index) => (
              <div
                key={index}
                className='flex flex-wrap items-center mt-2 gap-2'
              >
                <input
                  type='text'
                  value={color.name}
                  placeholder='Color Name'
                  onChange={(e) => {
                    const updatedColors = [...updatedProduct.colors]
                    updatedColors[index].name = e.target.value
                    setUpdatedProduct({
                      ...updatedProduct,
                      colors: updatedColors,
                    })
                  }}
                  className='w-full sm:w-4/12 md:w-5/12 p-2 pr-12 border border-gray-300 rounded-md text-sm'
                />
                <input
                  type='color'
                  value={color.hex || '#000000'}
                  onChange={(e) => {
                    const updatedColors = [...updatedProduct.colors]
                    updatedColors[index].hex = e.target.value
                    setUpdatedProduct({
                      ...updatedProduct,
                      colors: updatedColors,
                    })
                  }}
                  className='w-10 h-10 p-1 border border-gray-300 rounded-md'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveField('colors', index)}
                  className={`ml-2 text-red-500 ${
                    isMinusDisabled('colors') && 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={isMinusDisabled('colors')}
                >
                  -
                </button>
                {index === updatedProduct.colors.length - 1 && (
                  <button
                    type='button'
                    onClick={() =>
                      handleAddField('colors', { name: '', hex: '#000000' })
                    }
                    className='ml-2 text-blue-500'
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Sizes Section */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Sizes
            </label>
            {updatedProduct.sizes.map((size, index) => (
              <div
                key={index}
                className='flex flex-wrap items-center mt-2 gap-2'
              >
                <input
                  type='text'
                  value={size.name}
                  placeholder='Size Name'
                  onChange={(e) => {
                    const updatedSizes = [...updatedProduct.sizes]
                    updatedSizes[index].name = e.target.value
                    setUpdatedProduct({
                      ...updatedProduct,
                      sizes: updatedSizes,
                    })
                  }}
                  className='w-full sm:w-4/12 md:w-5/12 p-2 pr-12 border border-gray-300 rounded-md text-sm'
                />
                <select
                  value={size.inStock}
                  onChange={(e) => {
                    const updatedSizes = [...updatedProduct.sizes]
                    updatedSizes[index].inStock = e.target.value === 'true'
                    setUpdatedProduct({
                      ...updatedProduct,
                      sizes: updatedSizes,
                    })
                  }}
                  className='ml-2 p-2 border border-gray-300 rounded-md w-full sm:w-3/12'
                >
                  <option value='true'>In Stock</option>
                  <option value='false'>Out of Stock</option>
                </select>
                <button
                  type='button'
                  onClick={() => handleRemoveField('sizes', index)}
                  className={`ml-2 text-red-500 ${
                    isMinusDisabled('sizes') && 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={isMinusDisabled('sizes')}
                >
                  -
                </button>
                {index === updatedProduct.sizes.length - 1 && (
                  <button
                    type='button'
                    onClick={() =>
                      handleAddField('sizes', { name: '', inStock: true })
                    }
                    className='ml-2 text-blue-500'
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className='mt-6 flex justify-end space-x-4'>
          <button
            onClick={closeEditDialog}
            className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md'
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateProduct}
            className='px-4 py-2 bg-blue-500 text-white rounded-md'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProductModal
