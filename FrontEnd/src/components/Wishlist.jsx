import React from 'react'
import { useState, useEffect } from 'react'
import { X, ShoppingCart } from 'lucide-react'
import { Box, Button, Typography, Modal } from '@mui/material'

const Wishlist = ({ wishlistItems }) => {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)
  const [itemToRemove, setItemToRemove] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) // State to manage errors

  useEffect(() => {
    // Fetch wishlist data
    fetch('/api/wishlist', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          alert('Unauthorized. Please log in.')
        } else if (!response.ok) {
          throw new Error('Failed to fetch wishlist data')
        }
        return response.json()
      })
      .then((data) => {
        // Defensive check for the structure of the response
        if (data && data.data && Array.isArray(data.data.items)) {
          setItems(data.data.items)
        } else {
          setItems([])
          setError('No items found in wishlist.')
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error:', error)
        setError(error.message)
        setLoading(false)
      })
  }, [])

  const handleOpen = (item) => {
    setItemToRemove(item)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleRemove = () => {
    if (itemToRemove) {
      fetch(`/api/wishlist`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: itemToRemove.productId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to remove item')
          }
          return response.json()
        })
        .then((updatedWishlist) => {
          setItems(updatedWishlist.data.items)
          setItemToRemove(null)
          handleClose()
        })
        .catch((error) => console.error('Error:', error))
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='container mx-auto mt-10 flex justify-center'>
      <table className='w-full md:w-3/4 lg:w-1/2 bg-white'>
        <thead>
          <tr>
            <th className='text-left py-3 px-4 uppercase font-semibold text-sm font-poppins'>
              Product Info
            </th>
            <th className='text-left py-3 px-4 uppercase font-semibold text-sm font-poppins'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {error && (
            <tr>
              <td colSpan='2' className='text-center text-red-500'>
                {error}
              </td>
            </tr>
          )}
          {items.length === 0 && !error && (
            <tr>
              <td colSpan='2' className='text-center'>
                No items in your wishlist.
              </td>
            </tr>
          )}
          {items.map((item) => (
            <tr key={item._id || `${item.productId._id}-${item.addedAt}`}>
              <td className='py-4 px-4'>
                <div className='flex items-center space-x-4'>
                  <img
                    className='h-20 w-20 lg:h-24 lg:w-24 object-cover rounded-md'
                    src={item.productId.imageURL}
                    alt={item.productId.name}
                  />
                  <div className='text-sm md:text-base lg:text-lg'>
                    <h5 className='font-medium'>{item.productId.name}</h5>
                    <p className='text-gray-600'>Rs. {item.productId.price}</p>
                    <p className='text-sm text-gray-500'>
                      {item.productId.stockStatus}
                    </p>
                  </div>
                </div>
              </td>
              <td className='py-4 px-4'>
                <div className='flex items-center space-x-4'>
                  <ShoppingCart className='text-gray-500 cursor-pointer hover:text-gray-700' />
                  <X
                    className='text-gray-500 cursor-pointer hover:text-gray-700'
                    onClick={() => handleOpen(item)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            p: 4,
          }}
          aria-labelledby='remove-item-modal'
        >
          <Typography id='remove-item-modal' variant='h6'>
            Confirm Removal
          </Typography>
          <Typography sx={{ mt: 2 }}>
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
