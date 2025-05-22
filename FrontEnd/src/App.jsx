import Home from './pages/Home'
import Men from './pages/Men'
import Women from './pages/Women'
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

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <div className='min-h-screen flex-row'>
          <main className='flex-grow'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/men' element={<Men />} />
              <Route path='/women' element={<Women />} />
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
            </Routes>
          </main>
        </div>
      </BrowserRouter>

      <Footer />
    </div>
  )
}

export default App
