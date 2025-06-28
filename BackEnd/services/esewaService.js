import crypto from 'crypto'
import config from '../config/esewa.config.js'

/**
 * Generates a Base64-encoded HMAC SHA256 signature using the eSewa secret key.
 *
 * @param message - The message string to be signed or verified.
 * @returns Base64-encoded HMAC-SHA256 signature.
 */
function generateEsewaSignature(message) {
  const secretKey = config.secretKey

  if (!secretKey) {
    throw new Error('Missing ESEWA_SECRET_KEY in environment variables.')
  }

  // Generate HMAC-SHA256 signature
  const hmac = crypto.createHmac('sha256', secretKey)
  hmac.update(message)
  return hmac.digest('base64')
}

/**
 * Verifies eSewa response signature
 * @param responseData - The response data from eSewa
 * @param receivedSignature - The signature received from eSewa
 * @returns boolean - Whether the signature is valid
 */
function verifyEsewaSignature(responseData, receivedSignature) {
  try {
    const signedFieldNames = responseData.signed_field_names.split(',')
    const signatureInput = signedFieldNames
      .map((field) => `${field}=${responseData[field]}`)
      .join(',')

    const calculatedSignature = generateEsewaSignature(signatureInput)
    return calculatedSignature === receivedSignature
  } catch (error) {
    console.error('Error verifying eSewa signature:', error)
    return false
  }
}

/**
 * Creates payment parameters for eSewa
 * @param order - The order object
 * @returns Object containing payment parameters
 */
function createEsewaPaymentParams(order) {
  const transactionUuid = order._id // Use order ID as transaction UUID
  const baseAmount = order.totalAmount / 1.13 // Remove 13% VAT
  const taxAmount = order.totalAmount - baseAmount

  // Create signature message
  const signatureMessage = [
    `total_amount=${order.totalAmount.toFixed(2)}`,
    `transaction_uuid=${transactionUuid}`,
    `product_code=${config.merchantId}`,
  ].join(',')

  const signature = generateEsewaSignature(signatureMessage)

  return {
    amount: baseAmount.toFixed(2),
    tax_amount: taxAmount.toFixed(2),
    total_amount: order.totalAmount.toFixed(2),
    transaction_uuid: transactionUuid,
    product_code: config.merchantId,
    product_service_charge: '0.00',
    product_delivery_charge: '0.00',
    signed_field_names: 'total_amount,transaction_uuid,product_code',
    signature: signature,
    success_url: `${process.env.FRONTEND_URL}/payment-success`,
    failure_url: `${process.env.FRONTEND_URL}/payment-failure`,
  }
}

export {
  generateEsewaSignature,
  verifyEsewaSignature,
  createEsewaPaymentParams,
}
