import orderData from '../dataFile/orderData.json';

const OrderSummary = () => {
  // Calculate subtotal and total
  const subtotal = orderData.reduce((total, item) => total + parseFloat(item.Price), 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>

      {/* Items Section */}
      <div className="space-y-5">
        {orderData.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
              <img
                src={item.Image}
                alt={item.Name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div>
                <h3 className="text-gray-800 font-medium">{item.Name}</h3>
              </div>
            </div>
            <span className="text-gray-700 font-semibold">${item.Price}</span>
          </div>
        ))}
      </div>

      {/* Pricing Section */}
      <div className="border-t border-gray-300 pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-800 font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-800 font-semibold">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-4">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
