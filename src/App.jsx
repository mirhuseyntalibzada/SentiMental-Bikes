import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import './scss/style.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import OurStory from './pages/OurStory'
import DealerShip from './pages/DealerShip'
import Contact from './pages/Contact'
import BecomePartner from './pages/BecomePartner'
import ConfigureBike from './pages/ConfigureBike'
import MyAccount from './pages/MyAccount'
import Cart from './pages/Cart'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/' element={<OurStory />} />
        <Route path='/' element={<DealerShip />} />
        <Route path='/' element={<Contact />} />
        <Route path='/' element={<BecomePartner />} />
        <Route path='/' element={<ConfigureBike />} />
        <Route path='/' element={<MyAccount />} />
        <Route path='/' element={<Cart />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
