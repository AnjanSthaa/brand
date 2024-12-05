import { useState } from 'react'
import wishItems from '../dataFile/wishItems.json'
import { X } from 'lucide-react'
import { Box, Button, Typography, Modal } from '@mui/material'

const Wishlist = () => {
  const [items, setItems] = useState(wishItems)
  const [open, setOpen] = useState(false)
  const [itemToRemove, setItemToRemove] = useState(null)

  const handleOpen = (item) => {
    setItemToRemove(item)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleRemove = () => {
    if (itemToRemove) {
      setItems(items.filter((item) => item.id !== itemToRemove.id))
      setItemToRemove(null)
    }
    handleClose()
  }

  return (
    <div className='container mx-auto mt-10'>
      <table className='min-w-full bg-white'>
        <thead>
          <tr>
            <th className='text-left py-3 px-4 uppercase font-semibold text-sm'>
              Product
            </th>
            <th className='text-left py-3 px-4 uppercase font-semibold text-sm'>
              Price
            </th>
            <th className='text-left py-3 px-4 uppercase font-semibold text-sm'>
              Stock Status
            </th>
            <th className='text-left py-3 px-4 uppercase font-semibold text-sm'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className='py-4 px-4'>
                <div className='flex items-center'>
                  <img
                    className='h-16 w-16 mr-4 object-cover'
                    src={item.image}
                    alt={item.name}
                  />
                  <span className='font-medium'>{item.name}</span>
                </div>
              </td>
              <td className='py-4 px-4'>Rs.{item.price}</td>
              <td className='py-4 px-4'>{item.stockStatus}</td>
              <td className='py-4 px-4'>
                <div className='flex items-center space-x-2'>
                  <button className='bg-gray-900 text-white px-4 py-2 rounded hover:bg-white hover:text-black font-semibold border border-black transition duration-300'>
                    Add to Cart
                  </button>
                  <div className='relative group'>
                    <X
                      className='text-gray-500 cursor-pointer hover:text-gray-700'
                      onClick={() => handleOpen(item)}
                    />
                    <span className='absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -right-24 bottom-1 mb-1'>
                      Remove item
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Confirm Removal
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Are you sure you want to remove this item from your wishlist?
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button onClick={handleRemove} variant='contained' color='error'>
              Remove
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default Wishlist
