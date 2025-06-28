// eSewa Configuration
const esewaConfig = {
  // Testing Environment
  testing: {
    secretKey: process.env.ESEWA_SECRET_KEY || '8gBm/:&EnhH.1/q(',
    merchantId: process.env.ESEWA_MERCHANT_ID || 'EPAYTEST',
    baseUrl: process.env.ESEWA_BASE_URL || 'https://rc-epay.esewa.com.np',
    paymentUrl: 'https://rc-epay.esewa.com.np/api/epay/main/v2/form',
    statusCheckUrl: 'https://rc.esewa.com.np/api/epay/transaction/status/',
  },

  // Production Environment
  production: {
    secretKey: process.env.ESEWA_SECRET_KEY,
    merchantId: process.env.ESEWA_MERCHANT_ID,
    baseUrl: process.env.ESEWA_BASE_URL || 'https://epay.esewa.com.np',
    paymentUrl: 'https://epay.esewa.com.np/api/epay/main/v2/form',
    statusCheckUrl: 'https://epay.esewa.com.np/api/epay/transaction/status/',
  },
}

// Get current environment
const isProduction = process.env.NODE_ENV === 'production'
const config = isProduction ? esewaConfig.production : esewaConfig.testing

export default config
