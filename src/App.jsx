import React from 'react'
import { useEffect } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import OurStory from './pages/OurStory'
import DealerShip from './pages/DealerShip'
import Contact from './pages/Contact'
import BecomePartner from './pages/BecomePartner'
import ConfigureBike from './pages/ConfigureBike'
import MyAccount from './pages/MyAccount'
import Cart from './pages/Cart'
import Details from './pages/Details.jsx'
import Wishlist from './pages/Wishlist.jsx'
import FAQ from './pages/FAQ.jsx'
import AOS from 'aos'
import './scss/style.scss'
import 'aos/dist/aos.css';
import './i18n.js'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      offset: 100,
      easing: 'ease-out'
    })
  }, [])
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/our-story' element={<OurStory />} />
        <Route path='/dealership' element={<DealerShip />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/become-a-partner' element={<BecomePartner />} />
        <Route path='/configure-a-bike' element={<ConfigureBike />} />
        <Route path='/my-account' element={<MyAccount />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path="/details/:slug" element={<Details />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
