import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Typography,
} from '@mui/material'
import { X as XIcon, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cart({ open, onClose }) {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (open) {
      fetchCartItems()
    }
  }, [open])

  const fetchCartItems = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/cart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch cart items')
      }

      const data = await response.json()
      setProducts(data.data?.items || [])
    } catch (error) {
      console.error('Error:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  const clearCart = async () => {
    try {
      const response = await fetch('/api/cart/clear', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to clear cart')
      }

      // Refresh cart items after clearing
      fetchCartItems()
    } catch (error) {
      setError('Failed to clear cart')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='md' fullWidth>
      <DialogTitle>
        <div className='flex justify-between items-center'>
          <Typography variant='h6'>Shopping Cart</Typography>
          <IconButton onClick={onClose} edge='end'>
            <XIcon className='w-5 h-5' />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent dividers>
        {loading && <Typography>Loading cart...</Typography>}
        {error && <Typography color='error'>{error}</Typography>}
        {!loading && !error && products.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (
          products.map((product) => (
            <div
              key={product.productId._id}
              className='flex py-4 border-b last:border-none'
            >
              <img
                src={product.productId.image}
                alt={product.productId.name}
                className='w-24 h-24 object-cover rounded-md mr-4'
              />
              <div className='flex flex-col justify-between flex-grow'>
                <Typography variant='body1'>
                  {product.productId.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Quantity: {product.quantity}
                </Typography>
                <Typography variant='body1'>
                  ${(product.productId.price * product.quantity).toFixed(2)}
                </Typography>
              </div>
            </div>
          ))
        )}
        {!loading && !error && products.length > 0 && (
          <Button
            onClick={clearCart}
            color='error'
            startIcon={<Trash2 className='w-4 h-4' />}
            className='mt-4'
            fullWidth
          >
            Clear Cart
          </Button>
        )}
      </DialogContent>

      <DialogActions>
        <div className='flex flex-col w-full p-4'>
          <Button
            variant='contained'
            color='primary'
            fullWidth
            className='mt-4'
            onClick={handleCheckout}
            disabled={products.length === 0}
          >
            Checkout
          </Button>
          <Button
            onClick={onClose}
            color='secondary'
            fullWidth
            className='mt-2'
          >
            Continue Shopping
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  )
}
