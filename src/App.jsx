import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import OurStory from './pages/OurStory';
import DealerShip from './pages/DealerShip';
import Contact from './pages/Contact';
import BecomePartner from './pages/BecomePartner';
import ConfigureBike from './pages/ConfigureBike';
import MyAccount from './pages/MyAccount';
import Cart from './pages/Cart';
import Details from './pages/Details.jsx';
import Wishlist from './pages/Wishlist.jsx';
import FAQ from './pages/FAQ.jsx';
import AOS from 'aos';
import './scss/style.scss';
import 'aos/dist/aos.css';
import './i18n.js';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import supabase from './config/connect.js';
import { setCartToRedux, setOrdersToRedux, setProductToRedux } from './toolkit/features/cartSlice.js';
import { setWishlistToRedux } from './toolkit/features/wishlistSlice.js';
import NotFound from './pages/NotFound.jsx';

function App() {
  const [cookie] = useCookies(['cookie-user']);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartData = async () => {
      if (cookie['cookie-user']) {
        const { data } = await supabase.from('users').select();
        const user = data.find(({ token }) => token === cookie['cookie-user']);
        if (user) {
          if (user.cart) {
            dispatch(setCartToRedux(user.cart.cart));
            dispatch(setProductToRedux(user.cart.product));
            dispatch(setOrdersToRedux(user.cart.orders))
          }
          if (user.wishlist) {
            dispatch(setWishlistToRedux(user.wishlist.wishlist));
          }
        }
      }
    };
    fetchCartData();
  }, [dispatch, cookie]);

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      offset: 100,
      easing: 'ease-out'
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={
          <>
            <Header />
            <Outlet />
            <Footer />
          </>
        }>
          <Route path='/our-story' element={<OurStory />} />
          <Route path='/home' element={<Home />} />
          <Route path='/dealership' element={<DealerShip />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/become-a-partner' element={<BecomePartner />} />
          <Route path='/configure-a-bike' element={<ConfigureBike />} />
          <Route path='/my-account' element={<MyAccount />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path="/details/:slug" element={<Details />} />
          <Route path="/faq" element={<FAQ />} />
        </Route>
        <Route element={
          <>
            <Header />
            <Outlet />
          </>
        }>
            <Route path='/*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
