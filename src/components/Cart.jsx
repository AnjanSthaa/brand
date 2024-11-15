import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Typography,
} from '@mui/material';
import { X as XIcon } from 'lucide-react';

const products = [
  {
    id: 5,
    name: 'Throwback Hip Bag',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://via.placeholder.com/150',
    imageAlt: 'Placeholder image'
  },
  {
    id: 1,
    name: 'Throwback Hip Bag',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://via.placeholder.com/150',
    imageAlt: 'Placeholder image'
  },
  {
    id: 2,
    name: 'Throwback Hip Bag',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://via.placeholder.com/150',
    imageAlt: 'Placeholder image'
  },
  {
    id: 3,
    name: 'Throwback Hip Bag',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://via.placeholder.com/150',
    imageAlt: 'Placeholder image'
  },
  {
    id: 4,
    name: 'Throwback Hip Bag',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://via.placeholder.com/150',
    imageAlt: 'Placeholder image'
  },
];

Cart.propTypes = {
  open: PropTypes.bool.isRequired, // Ensures `open` is a boolean and required
  onClose: PropTypes.func.isRequired, // Ensures `onClose` is a function and required
};

export default function Cart({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <div className="flex justify-between items-center">
          <Typography variant="h6">Shopping Cart</Typography>
          <IconButton onClick={onClose} edge="end">
            <XIcon className="w-5 h-5" />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent dividers>
        {products.map((product) => (
          <div key={product.id} className="flex py-4 border-b last:border-none">
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="w-24 h-24 object-cover rounded-md mr-4"
            />
            <div className="flex flex-col justify-between">
              <Typography variant="body1">{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Color: {product.color}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {product.quantity}
              </Typography>
            </div>
            <Typography variant="body1" className="ml-auto">
              {product.price}
            </Typography>
          </div>
        ))}
      </DialogContent>

      <DialogActions>
        <div className="flex flex-col w-full p-4">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <Typography>Subtotal</Typography>
            <Typography>$262.00</Typography>
          </div>
          <Typography variant="body2" color="text.secondary">
            Shipping and taxes calculated at checkout.
          </Typography>
          <Button variant="contained" color="primary" fullWidth className="mt-4">
            Checkout
          </Button>
          <Button onClick={onClose} color="secondary" fullWidth className="mt-2">
            Continue Shopping
          </Button>
        </div>
      </DialogActions>
    </Dialog>

  );




}
