import { useState } from 'react'
import { Edit, Minus, Plus } from 'lucide-react'
import {
  Snackbar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useProductStore } from '../store/product'
import { useNavigate } from 'react-router-dom'

const SCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore()
  const navigate = useNavigate()

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: '',
  })
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [updatedProduct, setUpdatedProduct] = useState(product)

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false })

  const openDeleteDialog = (product) => {
    setSelectedProduct(product)
    setDeleteDialogOpen(true)
  }

  const closeDeleteDialog = () => setDeleteDialogOpen(false)

  const handleConfirmDelete = async () => {
    const { success, message } = await deleteProduct(selectedProduct._id)
    setSnackbar({
      open: true,
      message: success ? 'Product deleted successfully!' : message,
      type: success ? 'success' : 'error',
    })
    closeDeleteDialog()
  }

  const openEditDialog = (product) => {
    setUpdatedProduct(product)
    setEditDialogOpen(true)
  }

  const closeEditDialog = () => setEditDialogOpen(false)

  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(
      updatedProduct._id,
      updatedProduct
    )
    setSnackbar({
      open: true,
      message: success ? 'Product updated successfully!' : message,
      type: success ? 'success' : 'error',
    })
    closeEditDialog()
  }

  const handleFieldChange = (field, value) => {
    setUpdatedProduct({ ...updatedProduct, [field]: value })
  }

  const handleAddField = (key, value) => {
    setUpdatedProduct({
      ...updatedProduct,
      [key]: [...updatedProduct[key], value],
    })
  }

  const handleRemoveField = (key, index) => {
    const updatedField = [...updatedProduct[key]]
    updatedField.splice(index, 1)
    setUpdatedProduct({ ...updatedProduct, [key]: updatedField })
  }

  const handleCardClick = (id) => {
    navigate(`/product/${id}`)
  }

  const isMinusDisabled = (key) => updatedProduct[key].length === 1

  return (
    <div className='main-container flex justify-left items-center'>
      <div className='relative  w-[250px] rounded-lg overflow-hidden shadow-md bg-white transition-transform duration-200 hover:shadow-lg hover:scale-105 cursor-pointer'>
        <div className='relative  h-0 pb-[75%]'>
          <img
            className='absolute top-0 left-0 w-full h-full object-cover rounded-t-lg'
            src={product.image}
            alt={product.name}
            onClick={() => handleCardClick(product._id)}
          />
          <button
            className='absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:shadow-md'
            onClick={() => openDeleteDialog(product)}
          >
            <Minus className='w-5 h-5 text-gray-500' />
          </button>
          <button
            className='absolute bottom-2 right-2 bg-white rounded-full p-1 shadow hover:shadow-md'
            onClick={() => openEditDialog(product)}
          >
            <Edit className='w-5 h-5 text-gray-500 hover:text-blue-500' />
          </button>
        </div>
        <div className='mt-2 p-2 flex flex-col'>
          <h3 className='text-sm text-gray-700 pl-2'>{product.name}</h3>
          <p className='text-sm font-bold text-gray-900 pl-2 pt-2'>
            Rs. {product.price}
          </p>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          Are you sure you want to delete &quot;{selectedProduct?.name}&quot;?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onClose={closeEditDialog}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <label className='block text-sm font-medium text-gray-700'>
            Name
          </label>
          <TextField
            fullWidth
            value={updatedProduct.name || ''}
            onChange={(e) => handleFieldChange('name', e.target.value)}
          />
          <label className='block text-sm font-medium text-gray-700'>
            Price
          </label>
          <TextField
            type='number'
            fullWidth
            value={updatedProduct.price || ''}
            onChange={(e) => handleFieldChange('price', e.target.value)}
          />
          <label className='block text-sm font-medium text-gray-700'>
            Image
          </label>
          <TextField
            fullWidth
            value={updatedProduct.image || ''}
            onChange={(e) => handleFieldChange('image', e.target.value)}
          />

          {/* Colors Section */}
          <div className='mt-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Colors
            </label>
            {updatedProduct.colors.map((color, index) => (
              <div key={index} className='flex items-center mt-2'>
                <TextField
                  fullWidth
                  value={color.name || ''}
                  onChange={(e) => {
                    const updatedColors = [...updatedProduct.colors]
                    updatedColors[index].name = e.target.value
                    setUpdatedProduct({
                      ...updatedProduct,
                      colors: updatedColors,
                    })
                  }}
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
                  className='w-10 h-10 p-1 border border-gray-300 rounded-md ml-2'
                  aria-label='Select a color'
                />
                <Minus
                  onClick={() => handleRemoveField('colors', index)}
                  className={`cursor-pointer ml-2 ${
                    isMinusDisabled('colors')
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-red-500'
                  }`}
                  style={{
                    pointerEvents: isMinusDisabled('colors') ? 'none' : 'auto',
                  }}
                />
                {index === updatedProduct.colors.length - 1 && (
                  <Plus
                    onClick={() =>
                      handleAddField('colors', { name: '', hex: '#000000' })
                    }
                    className='cursor-pointer text-blue-500 ml-2'
                  />
                )}
              </div>
            ))}
          </div>

          {/* Sizes Section */}
          <div className='mt-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Sizes
            </label>
            {updatedProduct.sizes.map((size, index) => (
              <div key={index} className='flex items-center mt-2'>
                <TextField
                  fullWidth
                  value={size.name || ''}
                  onChange={(e) => {
                    const updatedSizes = [...updatedProduct.sizes]
                    updatedSizes[index].name = e.target.value
                    setUpdatedProduct({
                      ...updatedProduct,
                      sizes: updatedSizes,
                    })
                  }}
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
                  className='p-2 border border-gray-300 rounded-md text-sm ml-2'
                  aria-label='Select stock status'
                >
                  <option value='true'>In Stock</option>
                  <option value='false'>Out of Stock</option>
                </select>
                <Minus
                  onClick={() => handleRemoveField('sizes', index)}
                  className={`cursor-pointer ml-2 ${
                    isMinusDisabled('sizes')
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-red-500'
                  }`}
                  style={{
                    pointerEvents: isMinusDisabled('sizes') ? 'none' : 'auto',
                  }}
                />
                {index === updatedProduct.sizes.length - 1 && (
                  <Plus
                    onClick={() =>
                      handleAddField('sizes', { name: '', inStock: true })
                    }
                    className='cursor-pointer text-blue-500 ml-2'
                  />
                )}
              </div>
            ))}
          </div>

          {/* Highlights Section */}
          <div className='mt-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Highlights
            </label>
            {updatedProduct.highlights.map((highlight, index) => (
              <div key={index} className='flex items-center mt-2'>
                <TextField
                  fullWidth
                  value={highlight || ''}
                  onChange={(e) => {
                    const updatedHighlights = [...updatedProduct.highlights]
                    updatedHighlights[index] = e.target.value
                    setUpdatedProduct({
                      ...updatedProduct,
                      highlights: updatedHighlights,
                    })
                  }}
                />
                <Minus
                  onClick={() => handleRemoveField('highlights', index)}
                  className={`cursor-pointer ml-2 ${
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
                {index === updatedProduct.highlights.length - 1 && (
                  <Plus
                    onClick={() => handleAddField('highlights', '')}
                    className='cursor-pointer text-blue-500 ml-2'
                  />
                )}
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleUpdateProduct} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SCard
