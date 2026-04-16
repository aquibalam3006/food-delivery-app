import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Success from './pages/Success/Success'
import MyOrders from './pages/MyOrders/MyOrders'
import TrackOrder from './pages/TrackOrder/TrackOrder'


const App = () => {
  
  const [ShowLogin, setShowLogin] = useState(false)

  return (
    <>
    {ShowLogin?< LoginPopup setShowLogin={setShowLogin} />:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path="/success" element={<Success />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/track/:id" element={<TrackOrder />} />
        </Routes>
      </div>
      <ToastContainer />
      <Footer/>
    </>

  )
}

export default App
