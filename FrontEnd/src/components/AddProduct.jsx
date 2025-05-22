import { useState } from 'react'
import { Plus, Minus } from 'lucide-react' // Lucide icons import
import { useProductStore } from '../store/product'

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    desc: '',
    colors: [{ name: '', hex: '' }],
    sizes: [{ name: '', inStock: true, stockAmount: 0 }],
    highlights: [''],
  })
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  const { createProduct } = useProductStore()

  const handleAddProduct = async () => {
    setFeedback({ type: '', message: '' }) // Clear previous feedback

    const { success, message } = await createProduct(newProduct)

    if (success) {
      setFeedback({ type: 'success', message: 'Product added successfully!' })
      // Reset form
      setNewProduct({
        name: '',
        price: '',
        image: '',
        desc: '',
        colors: [{ name: '', hex: '' }],
        sizes: [{ name: '', inStock: true, stockAmount: 0 }],
        highlights: [''],
      })
    } else {
      setFeedback({
        type: 'error',
        message: message || 'Failed to add product',
      })
    }
  }

  const handleAddField = (key, value) => {
    setNewProduct({
      ...newProduct,
      [key]: [...newProduct[key], value],
    })
  }

  const handleRemoveField = (key, index) => {
    const updatedField = [...newProduct[key]]
    updatedField.splice(index, 1)
    setNewProduct({ ...newProduct, [key]: updatedField })
  }

  const isMinusDisabled = (key) => newProduct[key].length === 1

  return (
    <div className='m-0 flex justify-center items-center'>
      <div className='bg-white rounded-lg p-6 w-full'>
        {feedback.message && (
          <div
            className={`mb-4 p-3 rounded ${
              feedback.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {feedback.message}
          </div>
        )}

        <div className='flex flex-col items-center space-y-6'>
          <div className='flex flex-col w-full space-y-4'>
            {/* Product Name */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Product Name
              </label>
              <input
                type='text'
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
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
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className='block w-full p-3 border border-gray-300 rounded-md'
                placeholder='Enter product price'
              />
            </div>

            {/* Product Images */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Product Image
              </label>
              <input
                type='text'
                value={newProduct.image || ''}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
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
                value={newProduct.desc}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, desc: e.target.value })
                }
                className='block w-full p-3 border border-gray-300 rounded-md'
                placeholder='Enter product description'
              ></textarea>
            </div>

            {/* Colors Section */}
            <div className='mt-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Colors
              </label>
              {newProduct.colors.map((color, index) => (
                <div key={index} className='flex items-center mt-2'>
                  <label className='flex-1 relative'>
                    <input
                      type='text'
                      value={color.name}
                      placeholder='Color Name'
                      onChange={(e) => {
                        const updatedColors = [...newProduct.colors]
                        updatedColors[index].name = e.target.value
                        setNewProduct({ ...newProduct, colors: updatedColors })
                      }}
                      className='w-full p-2 pr-12 border border-gray-300 rounded-md text-sm'
                    />
                    <div className='absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1'>
                      <Minus
                        onClick={() => handleRemoveField('colors', index)}
                        className={`cursor-pointer ${
                          newProduct.colors.length <= 1
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-red-500'
                        }`}
                        style={{
                          pointerEvents:
                            newProduct.colors.length <= 1 ? 'none' : 'auto',
                        }}
                      />
                      {index === newProduct.colors.length - 1 && (
                        <Plus
                          onClick={() =>
                            handleAddField('colors', {
                              name: '',
                              hex: '#000000',
                            })
                          }
                          className='cursor-pointer text-blue-500'
                        />
                      )}
                    </div>
                  </label>
                  <input
                    type='color'
                    value={color.hex || '#000000'}
                    onChange={(e) => {
                      const updatedColors = [...newProduct.colors]
                      updatedColors[index].hex = e.target.value
                      setNewProduct({ ...newProduct, colors: updatedColors })
                    }}
                    className='w-10 h-10 p-1 border border-gray-300 rounded-md ml-2'
                    aria-label='Select a color'
                  />
                </div>
              ))}
            </div>

            {/* Sizes Section */}
            <div className='mt-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Sizes
              </label>
              {newProduct.sizes.map((size, index) => (
                <div key={index} className='flex items-center mt-2'>
                  <label className='flex-1 relative'>
                    <input
                      type='text'
                      value={size.name}
                      placeholder='Size'
                      onChange={(e) => {
                        const updatedSizes = [...newProduct.sizes]
                        updatedSizes[index].name = e.target.value
                        setNewProduct({ ...newProduct, sizes: updatedSizes })
                      }}
                      className='w-full p-2 pr-12 border border-gray-300 rounded-md text-sm'
                    />
                    <div className='absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1'>
                      <Minus
                        onClick={() => handleRemoveField('sizes', index)}
                        className={`cursor-pointer ${
                          isMinusDisabled('sizes')
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-red-500'
                        }`}
                        style={{
                          pointerEvents: isMinusDisabled('sizes')
                            ? 'none'
                            : 'auto',
                        }}
                      />
                      {index === newProduct.sizes.length - 1 && (
                        <Plus
                          onClick={() =>
                            handleAddField('sizes', {
                              name: '',
                              inStock: true,
                              stockAmount: 0,
                            })
                          }
                          className='cursor-pointer text-blue-500'
                        />
                      )}
                    </div>
                  </label>
                  <input
                    type='number'
                    min='0'
                    value={size.stockAmount}
                    placeholder='Stock Amount'
                    onChange={(e) => {
                      const updatedSizes = [...newProduct.sizes]
                      updatedSizes[index].stockAmount = parseInt(e.target.value)
                      setNewProduct({ ...newProduct, sizes: updatedSizes })
                    }}
                    className='w-24 p-2 border border-gray-300 rounded-md text-sm ml-2'
                  />
                  <select
                    value={size.inStock}
                    onChange={(e) => {
                      const updatedSizes = [...newProduct.sizes]
                      updatedSizes[index].inStock = e.target.value === 'true'
                      setNewProduct({ ...newProduct, sizes: updatedSizes })
                    }}
                    className='p-2 border border-gray-300 rounded-md text-sm ml-2'
                    aria-label='Select stock status'
                  >
                    <option value='true'>In Stock</option>
                    <option value='false'>Out of Stock</option>
                  </select>
                </div>
              ))}
            </div>

            {/* Highlights Section */}
            <div className='mt-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Highlights
              </label>
              {newProduct.highlights.map((highlight, index) => (
                <div key={index} className='flex items-center mt-2'>
                  <label className='flex-1 relative'>
                    <input
                      type='text'
                      value={highlight}
                      placeholder='Enter highlight'
                      onChange={(e) => {
                        const updatedHighlights = [...newProduct.highlights]
                        updatedHighlights[index] = e.target.value
                        setNewProduct({
                          ...newProduct,
                          highlights: updatedHighlights,
                        })
                      }}
                      className='w-full p-2 pr-12 border border-gray-300 rounded-md text-sm'
                    />
                    <div className='absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1'>
                      <Minus
                        onClick={() => handleRemoveField('highlights', index)}
                        className={`cursor-pointer ${
                          isMinusDisabled('highlights')
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-red-500'
                        }`}
                        style={{
                          pointerEvents: isMinusDisabled('highlights')
                            ? 'none'
                            : 'auto',
                        }}
                      />
                      {index === newProduct.highlights.length - 1 && (
                        <Plus
                          onClick={() => handleAddField('highlights', '')}
                          className='cursor-pointer text-blue-500'
                        />
                      )}
                    </div>
                  </label>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type='button'
              onClick={handleAddProduct}
              disabled={
                !newProduct.name || !newProduct.price || !newProduct.image
              }
              aria-label='Add a new product'
              className={`mt-4 px-6 py-3 rounded-md shadow-md transition duration-200 ${
                !newProduct.name || !newProduct.price || !newProduct.image
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
