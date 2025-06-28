// Simple test script to verify the payment endpoint
import fetch from 'node-fetch'

const testPaymentEndpoint = async () => {
  try {
    console.log('Testing payment endpoint...')

    const response = await fetch(
      'http://localhost:5000/api/payment/esewa/initiate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
        body: JSON.stringify({
          orderId: 'test-order-id',
        }),
      }
    )

    console.log('Response status:', response.status)

    if (response.ok) {
      const data = await response.json()
      console.log('Success response:', data)
    } else {
      const errorText = await response.text()
      console.log('Error response:', errorText)
    }
  } catch (error) {
    console.error('Test failed:', error.message)
  }
}

// Run the test
testPaymentEndpoint()
