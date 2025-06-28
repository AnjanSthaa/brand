import Home from './pages/Home'
import About from './pages/About'
import ContactPage from './pages/ContactPage'
import Profile from './pages/Profile'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Message from './pages/Message'
import NavBar from './components/NavBar'
import Shop from './pages/Shop'
import SellersPage from './pages/SellersPage'
import LoginForm from './pages/LoginForm'
import Signup from './pages/Signup'
import ProductDesc from './components/ProductDesc'
import Test from './pages/Test'
import ProtectedRoute from './store/ProtectedRoute'
import OrderHistory from './components/OrderHistory'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailure from './pages/PaymentFailure'

const AppContent = () => {
  return (
    <div>
      <NavBar />
      <div className='min-h-screen flex-row'>
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contactPage' element={<ContactPage />} />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path='/message' element={<Message />} />
            <Route path='/shop' element={<Shop />} />
            <Route
              path='/seller'
              element={
                <ProtectedRoute allowedRoles={['seller']}>
                  <SellersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/orders/:orderId'
              element={
                <ProtectedRoute allowedRoles={['seller']}>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
            <Route path='/product/:id' element={<ProductDesc />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/Test' element={<Test />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route
              path='/order-confirmation/:orderId'
              element={<OrderConfirmation />}
            />
            <Route path='/payment-success' element={<PaymentSuccess />} />
            <Route path='/payment-failure' element={<PaymentFailure />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
