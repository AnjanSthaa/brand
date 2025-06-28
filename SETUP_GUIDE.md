# eSewa Integration Setup Guide

Your eSewa integration is now complete and fully functional with:

- ✅ Secure payment processing
- ✅ Automatic stock reservation
- ✅ Enhanced order history
- ✅ Cart clearing
- ✅ Error handling

## 🚀 **Quick Start**

### 1. **Environment Variables**

Ensure your `BackEnd/.env` file has:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/your_database

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Frontend URL
FRONTEND_URL=http://localhost:5173

# eSewa Configuration
ESEWA_SECRET_KEY=8gBm/:&EnhH.1/q
ESEWA_MERCHANT_ID=EPAYTEST
ESEWA_BASE_URL=https://rc-epay.esewa.com.np
```

### 2. **Start Servers**

```bash
# Backend
cd BackEnd
npm start

# Frontend (in another terminal)
cd FrontEnd
npm run dev
```

### 3. **Test Integration**

```bash
cd BackEnd
node test-esewa-integration.js
```
