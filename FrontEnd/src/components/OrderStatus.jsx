import { useState, useEffect } from 'react'

const OrderStatus = ({ orderId }) => {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}/status`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        const data = await response.json()
        setStatus(data.status)
      } catch (error) {
        console.error('Error fetching order status:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [orderId])

  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div
      className={`px-4 py-2 rounded-full inline-flex items-center ${getStatusColor()}`}
    >
      <span className='text-sm font-medium'>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </div>
  )
}

export default OrderStatus
