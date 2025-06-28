# eSewa Payment Integration

This document explains how to integrate eSewa payment gateway into your existing e-commerce application.

## Overview

The integration adds eSewa as a payment option alongside your existing Cash on Delivery method. Users can now pay securely using their eSewa digital wallet with automatic stock reservation and order management.

## Features

- ✅ **Secure Payment Processing**: HMAC-SHA256 signature verification
- ✅ **Testing Environment**: Ready for eSewa's testing environment
- ✅ **Production Ready**: Easy switch to production environment
- ✅ **Error Handling**: Comprehensive error handling and user feedback
- ✅ **Order Management**: Automatic order status updates and stock reservation
- ✅ **Signature Verification**: Response signature verification for security
- ✅ **Stock Reservation**: Automatic stock deduction after successful payment
- ✅ **Cart Clearing**: Automatic cart clearing after payment completion
- ✅ **Order History**: Enhanced order history with payment method display
- ✅ **Expected Delivery**: 3-5 day delivery window calculation

## File Structure

```
BackEnd/
├── config/
│   └── esewa.config.js          # eSewa configuration
├── services/
│   └── esewaService.js          # eSewa payment service
├── routes/
│   └── payment.js               # Payment API routes with stock reservation
├── models/
│   ├── order.model.js           # Updated with paymentDetails
│   ├── product.model.js         # For stock management
│   └── cart.model.js            # For cart clearing
└── test-esewa-integration.js    # Integration testing script

FrontEnd/src/
├── components/
│   ├── PaymentMethodSelector.jsx # Updated with eSewa option
│   └── OrderHistory.jsx         # Enhanced with payment method display
├── pages/
│   ├── OrderConfirmation.jsx    # Updated with eSewa handling
│   ├── PaymentSuccess.jsx       # Updated for multiple payment methods
│   └── PaymentFailure.jsx       # Error handling
```

## Environment Variables

Add these to your backend `.env` file:

```env
# eSewa Configuration
ESEWA_SECRET_KEY=8gBm/:&EnhH.1/q
ESEWA_MERCHANT_ID=EPAYTEST
ESEWA_BASE_URL=https://rc-epay.esewa.com.np
FRONTEND_URL=http://localhost:5173

# For Production:
# ESEWA_SECRET_KEY=your_production_secret_key
# ESEWA_MERCHANT_ID=your_production_merchant_id
# ESEWA_BASE_URL=https://epay.esewa.com.np
# FRONTEND_URL=https://yourdomain.com
```

## Setup Instructions

### 1. Backend Setup

1. **Install dependencies** (if not already installed):

   ```bash
   cd BackEnd
   npm install
   ```

2. **Add payment routes** to your main server file:

   ```javascript
   import paymentRoutes from './routes/payment.js'
   app.use('/api/payment', paymentRoutes)
   ```

3. **Set environment variables** in your `.env` file

4. **Start the server**:

   ```bash
   npm start
   ```

### 2. Frontend Setup

1. **Update PaymentMethodSelector**: Already updated with eSewa option
2. **Update OrderConfirmation**: Already updated with eSewa handling
3. **Update PaymentSuccess**: Already updated for multiple payment methods
4. **Update OrderHistory**: Enhanced with payment method display and delivery dates

### 3. Database Schema

Ensure your Order model includes these fields:

```javascript
{
  _id: String,
  totalAmount: Number,
  status: String, // 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
  paymentStatus: String, // 'pending', 'paid', 'failed'
  paymentMethod: String, // 'cash_on_delivery', 'esewa'
  paymentDetails: {
    transactionId: String,
    paymentDate: Date,
    amount: Number
  },
  stockReserved: Boolean, // true after successful payment
  items: [{
    productId: ObjectId,
    quantity: Number,
    price: Number,
    size: String
  }]
}
```

## Testing

### 1. Testing Credentials

Use these credentials for testing:

- **eSewa ID**: 9806800001/2/3/4/5
- **Password**: Nepal@123
- **MPIN**: 1122
- **Token**: 123456

### 2. Test Flow

1. Create an order through your checkout process
2. Select "eSewa Digital Wallet" as payment method
3. Click "Pay with eSewa"
4. You'll be redirected to eSewa's testing environment
5. Use the testing credentials to complete payment
6. You'll be redirected back to your success page with Base64 encoded data
7. Order will be automatically updated with stock reserved
8. Check order history to see payment method and delivery dates

### 3. Testing URLs

- **Testing**: `https://rc-epay.esewa.com.np/api/epay/main/v2/form`
- **Production**: `https://epay.esewa.com.np/api/epay/main/v2/form`

## API Endpoints

### 1. Initiate eSewa Payment

```
POST /api/payment/esewa/initiate
Content-Type: application/json
Authorization: Bearer <token>

{
  "orderId": "order_id_here"
}
```

**Response:**

```json
{
  "success": true,
  "paymentUrl": "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
  "params": {
    "amount": "100.00",
    "tax_amount": "13.00",
    "total_amount": "113.00",
    "transaction_uuid": "order_id",
    "product_code": "EPAYTEST",
    "signature": "generated_signature",
    "success_url": "http://localhost:5173/payment-success",
    "failure_url": "http://localhost:5173/payment-failure"
  }
}
```

### 2. Update Order Status (Frontend)

```
POST /api/payment/esewa/update-status
Content-Type: application/json
Authorization: Bearer <token>

{
  "orderId": "order_id_here",
  "esewaData": {
    "transaction_uuid": "order_id",
    "total_amount": "113.00",
    "status": "COMPLETE",
    "signature": "received_signature"
  }
}
```

### 3. Check Payment Status

```
GET /api/payment/esewa/status/:orderId
```

## Stock Reservation & Order Management

### Automatic Stock Reservation

After successful eSewa payment:

1. **Stock Deduction**: Product stock is automatically reduced
2. **Order Status Update**: Order status changes to "processing"
3. **Stock Reserved Flag**: `stockReserved` is set to `true`
4. **Cart Clearing**: User's cart is automatically cleared
5. **Order History**: Order appears in order history

### Order History Enhancements

The order history now displays:

- **Payment Method**: "Paid via eSewa" or "Pay cash on delivery"
- **Expected Arrival**: 3-5 day delivery window
- **Payment Status**: Color-coded status indicators
- **Order Status**: Processing, shipped, delivered, etc.

## Security Features

1. **HMAC-SHA256 Signature**: All requests are signed for security
2. **Response Verification**: eSewa responses are verified using signatures
3. **Order Validation**: Orders are validated before payment processing
4. **Error Handling**: Comprehensive error handling and logging
5. **Stock Validation**: Stock availability is checked before reservation

## Production Deployment

1. **Update Environment Variables**:

   - Set `NODE_ENV=production`
   - Use production eSewa credentials
   - Update `FRONTEND_URL` to your production domain

2. **SSL Certificate**: Ensure your domain has SSL certificate (HTTPS)

3. **Webhook URLs**: Update success and failure URLs to production URLs

4. **Database Backup**: Ensure regular database backups

## Troubleshooting

### Common Issues

1. **"Unexpected token '<', "<!DOCTYPE "... is not valid JSON" Error**:

   - Check that payment routes are added to server.js
   - Verify server is running on correct port
   - Check API endpoint URLs

2. **"Invalid payload signature" Error**:

   - Check your `ESEWA_SECRET_KEY` is correct
   - Verify the signature generation matches eSewa's requirements
   - Ensure all required parameters are included

3. **Order Not Appearing in History**:

   - Check that `stockReserved` is set to `true`
   - Verify order status is "processing"
   - Check payment status is "paid"

4. **Stock Not Reserved**:

   - Check backend logs for stock reservation errors
   - Verify product stock availability
   - Check order items and quantities

### Debug Information

Enable debug logging by checking your backend console:

```javascript
// Look for these debug messages:
console.log('eSewa Payment Params:', paymentParams)
console.log('Stock reserved and order finalized for order:', orderId)
console.log('Fetched orders:', data.data)
```

### Testing Integration

Run the integration test:

```bash
cd BackEnd
node test-esewa-integration.js
```

## License

This integration is part of your existing e-commerce application.
