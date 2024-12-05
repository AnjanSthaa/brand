import ContactInfo from '../components/ContactInfo';
import ShippingInfo from '../components/ShippingInfo';
import DeliveryMethod from '../components/DeliveryMethod';
import OrderSummary from '../components/OrderSummary';

const Checkout = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 sm:p-8 bg-white shadow-xl rounded-lg flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-10">
      
      {/* Left Form Section */}
      <form className="flex-grow space-y-6 w-full md:w-3/5">
        <ContactInfo />
        <ShippingInfo />
        <DeliveryMethod />
      </form>
      
      {/* Right Order Summary Section */}
      <div className="w-full md:w-2/5 space-y-4">
        <OrderSummary />
        <div className="flex justify-center mt-4">
          <button 
            type="submit" 
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out shadow-md">
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
