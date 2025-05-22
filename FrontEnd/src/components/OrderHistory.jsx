import { useState, useEffect } from 'react'

const OrderHistory = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch orders')
        }

        const data = await response.json()
        setOrders(data.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) return <div>Loading orders...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='bg-white shadow-lg rounded-lg p-6'>
      <h2 className='text-2xl font-bold mb-6'>Order History</h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='px-6 py-3 text-left'>Order ID</th>
              <th className='px-6 py-3 text-left'>Products</th>
              <th className='px-6 py-3 text-left'>Total Amount</th>
              <th className='px-6 py-3 text-left'>Status</th>
              <th className='px-6 py-3 text-left'>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className='border-b'>
                <td className='px-6 py-4'>{order._id}</td>
                <td className='px-6 py-4'>
                  {order.items.map((item) => (
                    <div key={item._id}>
                      {item.productId.name} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td className='px-6 py-4'>Rs. {order.totalAmount}</td>
                <td className='px-6 py-4'>
                  <OrderStatus orderId={order._id} />
                </td>
                <td className='px-6 py-4'>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderHistory
